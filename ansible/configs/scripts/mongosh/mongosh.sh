#!/bin/bash
set -e

# Resolve symlink correctly
SCRIPT_PATH="$(readlink -f "${BASH_SOURCE[0]}")"
CONFIG_DIR="$(dirname "$SCRIPT_PATH")"
source "$CONFIG_DIR/.env"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

show_usage() {
  cat << HELP
${BLUE}📊 MongoDB Connection Manager${NC}

Usage: mongo-connect [app-env] [command]

Examples:
  mongo-connect myapp-local      # Connect to local database
  mongo-connect myapp-staging    # Connect to staging database
  mongo-connect myapp-prod       # Connect to prod database (with SSH tunnel)
  
Commands:
  mongo-connect list               # List all available connections
  mongo-connect config             # Edit configuration (.env) in vim
  mongo-connect tunnel-close       # Close SSH tunnel
  mongo-connect help               # Show this message

HELP
}

# Function to list all available connections
list_connections() {
  echo -e "${BLUE}📋 Available connections:${NC}"
  echo ""
  
  grep -E "^MONGO_" "$CONFIG_DIR/.env" | grep -v "^#" | while read line; do
    app_env=$(echo "$line" | cut -d'=' -f1 | sed 's/MONGO_//' | tr '[:upper:]' '[:lower:]' | sed 's/_/-/g')
    echo -e "  ${GREEN}mongo-connect ${app_env}${NC}"
  done
  
  echo ""
}

# Function to connect
connect() {
  local app=$1
  local env=$2
  
  if [ -z "$app" ] || [ -z "$env" ]; then
    echo -e "${RED}❌ Invalid format. Use: mongo-connect app-env${NC}"
    show_usage
    exit 1
  fi
  
  # Build variable name: myapp-local → MONGO_MYAPP_LOCAL
  local var_name="MONGO_$(echo "${app}_${env}" | tr '[:lower:]' '[:upper:]')"
  local connection="${!var_name}"
  
  if [ -z "$connection" ]; then
    echo -e "${RED}❌ Connection not found: ${app}-${env}${NC}"
    echo ""
    list_connections
    exit 1
  fi
  
  # Detect if SSH tunnel is needed
  if [[ "$env" == "prod" ]] && [[ "$TUNNEL_APPS_PROD" == *"$app"* ]]; then
    setup_tunnel "$app"
  fi
  
  echo -e "${GREEN}🔗 Connecting to ${app}-${env}...${NC}"
  mongosh "$connection"
}

# Function to configure SSH tunnel
setup_tunnel() {
  local app=$1
  
  echo -e "${YELLOW}🔓 Configuring SSH tunnel for production...${NC}"
  
  # Check if tunnel is already open
  if ! nc -z 127.0.0.1 27017 &>/dev/null; then
    ssh -N -L 27017:mgc-br-se1-ms-myapp-imongo80-01.mglu.io:27017 \
        -o "ConnectTimeout=10" \
        -o "ServerAliveInterval=60" \
        "${SSH_USER}@${SSH_HOSTS_PROD}" -p "${SSH_PORT}" &
    
    TUNNEL_PID=$!
    echo -e "${YELLOW}⏳ Waiting for tunnel (PID: $TUNNEL_PID)...${NC}"
    sleep 2
    
    if nc -z 127.0.0.1 27017 &>/dev/null; then
      echo -e "${GREEN}✅ Tunnel open! (To close: mongo-connect tunnel-close)${NC}"
    else
      echo -e "${RED}❌ Failed to open tunnel${NC}"
      kill $TUNNEL_PID 2>/dev/null || true
      exit 1
    fi
  else
    echo -e "${GREEN}✅ Tunnel is already open${NC}"
  fi
}

# Function to close tunnel
close_tunnel() {
  echo -e "${YELLOW}🔌 Closing SSH tunnel...${NC}"
  pkill -f "ssh -N -L 27017" || true
  echo -e "${GREEN}✅ Tunnel closed${NC}"
}

# Function to edit configuration
edit_config() {
  echo -e "${YELLOW}✏️  Opening configuration in vim...${NC}"
  ${EDITOR:-vim} "$CONFIG_DIR/.env"
  echo -e "${GREEN}✅ Configuration saved${NC}"
}

# Main
case "$1" in
  "")
    show_usage
    exit 1
    ;;
  "list")
    list_connections
    ;;
  "config")
    edit_config
    ;;
  "tunnel-close")
    close_tunnel
    ;;
  "help"|"-h"|"--help")
    show_usage
    ;;
  *)
    # Parse app-env
    app_env="$1"
    if [[ "$app_env" == *"-"* ]]; then
      app="${app_env%-*}"
      env="${app_env#*-}"
      connect "$app" "$env"
    else
      echo -e "${RED}❌ Invalid format. Use: mongo-connect app-env (ex: myapp-local)${NC}"
      show_usage
      exit 1
    fi
    ;;
esac
