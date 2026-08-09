#!/usr/bin/env bash

# Arkflix Media Server Provisioning Script
set -e

# --- Color Formatting ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

info "Starting Arkflix Media Server Provisioning..."

# Load .env file if present in the script directory (supports YAML format key: "value")
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "${SCRIPT_DIR}/.env" ]; then
    info "Loading environment variables from ${SCRIPT_DIR}/.env"
    eval "$(grep -E '^[A-Za-z0-9_]+:' "${SCRIPT_DIR}/.env" | sed -E 's/^([A-Za-z0-9_]+):[[:space:]]*/export \1=/')"
fi

# --- 0. Interactive / Environment Variables ---
DOMAIN_JELLYFIN="${DOMAIN_JELLYFIN:-}"
DOMAIN_NAVIDROME="${DOMAIN_NAVIDROME:-}"
EMAIL="${EMAIL:-}"

if [ -z "${DOMAIN_JELLYFIN}" ]; then
    read -rp "Enter Jellyfin domain (e.g. arkflix-jellyfin.duckdns.org): " DOMAIN_JELLYFIN
fi

if [ -z "${DOMAIN_NAVIDROME}" ]; then
    read -rp "Enter Navidrome domain (e.g. arkflix-music.duckdns.org): " DOMAIN_NAVIDROME
fi

if [ -z "${EMAIL}" ]; then
    read -rp "Enter Email address for Let's Encrypt / Certbot: " EMAIL
fi

if [ -z "${DOMAIN_JELLYFIN}" ] || [ -z "${DOMAIN_NAVIDROME}" ] || [ -z "${EMAIL}" ]; then
    error "Missing required parameters (DOMAIN_JELLYFIN, DOMAIN_NAVIDROME, EMAIL)."
    exit 1
fi

# --- 1. Docker and Network Verification ---
info "1. Verifying Docker & Docker Network..."
if ! systemctl is-active --quiet docker; then
    warn "Docker service is not running. Starting Docker..."
    systemctl start docker
    systemctl enable docker
fi

if ! docker network inspect media-network &>/dev/null; then
    info "Creating Docker network 'media-network'..."
    docker network create media-network
    success "Docker network 'media-network' created."
else
    success "Docker network 'media-network' already exists."
fi

# --- 2. Directory Structure Setup ---
info "2. Creating Directory Structure..."
MEDIA_DIRS=(
    "/var/media/desenhos"
    "/var/media/filmes"
    "/var/media/series"
    "/var/media/musicas"
    "/var/lib/navidrome"
    "/var/lib/jellyfin/config"
    "/var/lib/jellyfin/cache"
    "/opt/media-stack"
)

for dir in "${MEDIA_DIRS[@]}"; do
    mkdir -p "${dir}"
    chmod 755 "${dir}"
done
success "Directory structure created with 755 permissions."

# --- 3. Docker Compose File Creation & Service Launch ---
info "3. Generating /opt/media-stack/docker-compose.yml..."
cat <<EOF > /opt/media-stack/docker-compose.yml
services:
  jellyfin:
    image: jellyfin/jellyfin:latest
    container_name: jellyfin
    restart: unless-stopped
    ports:
      - "127.0.0.1:8096:8096"
    volumes:
      - /var/lib/jellyfin/config:/config
      - /var/lib/jellyfin/cache:/cache
      - /var/media:/media:ro
    networks:
      - media-network

  navidrome:
    image: deluan/navidrome:latest
    container_name: navidrome
    restart: unless-stopped
    ports:
      - "127.0.0.1:4533:4533"
    environment:
      ND_SCANSCHEDULE: 1h
      ND_LOGLEVEL: info
      ND_SESSIONTIMEOUT: 24h
      ND_BASEURL: ""
    volumes:
      - /var/lib/navidrome:/data
      - /var/media/musicas:/music:ro
    networks:
      - media-network

networks:
  media-network:
    external: true
EOF

info "Starting Docker Compose services (Jellyfin & Navidrome)..."
docker compose -f /opt/media-stack/docker-compose.yml up -d
success "Media stack containers started."

# --- 4. Install Nginx, Certbot and UFW ---
info "4. Installing Nginx, Certbot and UFW via apt..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq nginx certbot python3-certbot-nginx ufw

# --- 5. Configure Firewall (UFW) ---
info "5. Configuring UFW Firewall..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
success "UFW configured (Ports 22, 80, 443 allowed)."

# --- 6. Temporary Nginx Configuration (HTTP / ACME Challenge) ---
info "6. Setting up Temporary Nginx Config for Certbot ACME Challenge..."
mkdir -p /var/www/html/.well-known/acme-challenge

cat <<EOF > /etc/nginx/sites-available/arkflix-temp.conf
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN_JELLYFIN} ${DOMAIN_NAVIDROME};

    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    location / {
        return 200 'Arkflix Provisioning ACME Challenge Endpoint';
        add_header Content-Type text/plain;
    }
}
EOF

rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/arkflix-temp.conf /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx || systemctl restart nginx
success "Temporary HTTP Nginx configuration active."

# --- 7. Certbot SSL Certificate Generation ---
info "7. Requesting Let's Encrypt SSL Certificates via Certbot..."
certbot certonly --webroot -w /var/www/html \
    -d "${DOMAIN_JELLYFIN}" \
    --email "${EMAIL}" \
    --agree-tos \
    --non-interactive \
    --keep-until-expiring

certbot certonly --webroot -w /var/www/html \
    -d "${DOMAIN_NAVIDROME}" \
    --email "${EMAIL}" \
    --agree-tos \
    --non-interactive \
    --keep-until-expiring

success "SSL certificates generated successfully."

# --- 8. Final Definitive Nginx Configuration ---
info "8. Applying Definitive Nginx Configuration with SSL and WebSockets..."

# Jellyfin Config
cat <<EOF > "/etc/nginx/sites-available/${DOMAIN_JELLYFIN}.conf"
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN_JELLYFIN};
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name ${DOMAIN_JELLYFIN};

    ssl_certificate /etc/letsencrypt/live/${DOMAIN_JELLYFIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN_JELLYFIN}/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    client_max_body_size 20M;
    proxy_buffers 100 32k;
    proxy_buffer_size 32k;

    location / {
        proxy_pass http://127.0.0.1:8096;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-Protocol \$scheme;
        proxy_set_header X-Forwarded-Host \$http_host;

        # WebSockets
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF

# Navidrome Config
cat <<EOF > "/etc/nginx/sites-available/${DOMAIN_NAVIDROME}.conf"
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN_NAVIDROME};
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name ${DOMAIN_NAVIDROME};

    ssl_certificate /etc/letsencrypt/live/${DOMAIN_NAVIDROME}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN_NAVIDROME}/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    client_max_body_size 100M;
    proxy_buffers 100 32k;
    proxy_buffer_size 32k;

    location / {
        proxy_pass http://127.0.0.1:4533;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;

        # WebSockets
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF

rm -f /etc/nginx/sites-enabled/arkflix-temp.conf
ln -sf "/etc/nginx/sites-available/${DOMAIN_JELLYFIN}.conf" /etc/nginx/sites-enabled/
ln -sf "/etc/nginx/sites-available/${DOMAIN_NAVIDROME}.conf" /etc/nginx/sites-enabled/

nginx -t
systemctl reload nginx
success "Definitive Nginx configuration applied and reloaded."

# --- 9. SSL Auto-Renewal Automation ---
info "9. Configuring Automatic SSL Renewal Cron Job..."
cat <<EOF > /etc/cron.d/certbot-renew
0 3 * * * root certbot renew --quiet --deploy-hook "systemctl reload nginx"
EOF
chmod 644 /etc/cron.d/certbot-renew

systemctl enable --now certbot.timer || true
success "SSL renewal cron job (daily at 03:00 AM) and certbot.timer configured."

# --- 10. Summary & Completion ---
echo ""
echo -e "${GREEN}======================================================${NC}"
echo -e "${GREEN}🎉 ARKFLIX MEDIA SERVER PROVISIONING COMPLETE!${NC}"
echo -e "${GREEN}======================================================${NC}"
echo -e "📺 Jellyfin URL:  https://${DOMAIN_JELLYFIN}"
echo -e "🎵 Navidrome URL: https://${DOMAIN_NAVIDROME}"
echo -e ""
echo -e "${BLUE}📂 Media Directories:${NC}"
echo -e "  • Drawings: /var/media/desenhos"
echo -e "  • Movies:   /var/media/filmes"
echo -e "  • Series:   /var/media/series"
echo -e "  • Music:    /var/media/musicas"
echo -e "======================================================"
