# Gideon Media Tools Makefile
# Provisionado em ~/.config/gideon/ via Genesis Ansible

# Variáveis configuráveis
URL ?= ""
FORMAT ?= mp4
DIR ?= .
DEST_DIR ?= $(DIR)
BROWSER ?= chrome

.PHONY: help install download convert optimize

# Ajuda padrão
help:
	@echo "=========================================="
	@echo "🎬 Gideon Media Tools Makefile"
	@echo "=========================================="
	@echo "Uso:"
	@echo "  make install                                         - Instala yt-dlp, ffmpeg, spotdl e dependências via apt/pip"
	@echo "  make download URL=\"...\" FORMAT=mp4                  - Baixa vídeo em MP4 no diretório alvo (padrão)"
	@echo "  make download URL=\"...\" FORMAT=mp3                  - Baixa áudio em MP3 no diretório alvo"
	@echo "  make download URL=\"https://open.spotify.com/...\"    - Baixa do Spotify em MP3 via spotDL (Auto-detect)"
	@echo "  make convert                                         - Converte/Otimiza mídias da pasta atual para H.264+AAC (.mp4)"
	@echo "  make convert DIR=\"/caminho/para/pasta\"               - Converte mídias da pasta especificada"
	@echo "=========================================="

# Instala todas as dependências necessárias via apt e pip (incluindo spotdl)
install:
	@chmod +x ./gideon.sh
	@./gideon.sh install

# Módulo de Download Geral (YouTube via yt-dlp ou Spotify via spotdl com detecção automática)
download:
	@chmod +x ./gideon.sh
	@./gideon.sh download "$(URL)" "$(FORMAT)" "$(DEST_DIR)" "$(BROWSER)"

# Módulo de Transcodificação Inteligente (Validação Chromecast: H.264 + AAC + .mp4)
convert:
	@chmod +x ./gideon.sh
	@./gideon.sh convert "$(DIR)"

# Alias de compatibilidade para convert
optimize: convert
