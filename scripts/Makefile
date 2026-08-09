# Genesis Media Tools Makefile
# Centraliza download do YouTube (vídeo/áudio) e otimização/transcodificação inteligente de mídia.

# Variáveis configuráveis
URL ?= ""
FORMAT ?= mp4
DIR ?= .
DEST_DIR ?= ./downloads
BROWSER ?= chrome

.PHONY: help install download optimize

# Ajuda padrão
help:
	@echo "=========================================="
	@echo "🎬 Genesis Media Tools Makefile"
	@echo "=========================================="
	@echo "Uso:"
	@echo "  make install                                         - Instala yt-dlp, ffmpeg, spotdl e dependências via apt/pip"
	@echo "  make download URL=\"...\" FORMAT=mp4                  - Baixa vídeo do YouTube em MP4 (padrão)"
	@echo "  make download URL=\"...\" FORMAT=mp3                  - Baixa áudio do YouTube em MP3"
	@echo "  make download URL=\"https://open.spotify.com/...\"    - Baixa faixas/playlists do Spotify em MP3 (Auto-detect)"
	@echo "  make optimize                                        - Transcodifica mídias da pasta atual para H.264+AAC (.mp4)"
	@echo "  make optimize DIR=\"/caminho/para/pasta\"               - Transcodifica mídias da pasta especificada"
	@echo "=========================================="

# Instala todas as dependências necessárias via apt e pip (incluindo spotdl)
install:
	@echo "📦 Instalando yt-dlp, ffmpeg, spotdl e dependências..."
	sudo apt update && sudo apt install -y yt-dlp ffmpeg python3-pip python3-secretstorage python3-cryptography
	pip3 install --break-system-packages spotdl || pip3 install spotdl
	@echo "✅ Instalação concluída!"

# Módulo de Download Geral (YouTube via yt-dlp ou Spotify via spotdl com detecção automática)
download:
	@chmod +x ./media.sh
	@./media.sh download "$(URL)" "$(FORMAT)" "$(DEST_DIR)" "$(BROWSER)"

# Módulo de Transcodificação Inteligente (Validação Chromecast: H.264 + AAC + .mp4)
optimize:
	@chmod +x ./media.sh
	@./media.sh optimize "$(DIR)"
