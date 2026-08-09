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
	@echo "  make install                                         - Instala yt-dlp, ffmpeg e dependências no sistema via apt"
	@echo "  make download URL=\"...\" FORMAT=mp4                  - Baixa vídeo em MP4 (padrão)"
	@echo "  make download URL=\"...\" FORMAT=mp3                  - Baixa apenas o áudio extraído em MP3"
	@echo "  make download URL=\"...\" FORMAT=mp4 BROWSER=firefox  - Usa cookies do navegador para evitar bloqueio"
	@echo "  make optimize                                        - Transcodifica mídias da pasta atual para H.264+AAC (.mp4)"
	@echo "  make optimize DIR=\"/caminho/para/pasta\"               - Transcodifica mídias da pasta especificada"
	@echo "=========================================="

# Instala todas as dependências necessárias via apt
install:
	@echo "📦 Instalando yt-dlp, ffmpeg e dependências de cookies..."
	sudo apt update && sudo apt install -y yt-dlp ffmpeg python3-secretstorage python3-cryptography
	@echo "✅ Instalação concluída!"

# Módulo de Download (suporta FORMAT=mp4 ou FORMAT=mp3)
download:
	@chmod +x ./media.sh
	@./media.sh download "$(URL)" "$(FORMAT)" "$(DEST_DIR)" "$(BROWSER)"

# Módulo de Transcodificação Inteligente (Validação Chromecast: H.264 + AAC + .mp4)
optimize:
	@chmod +x ./media.sh
	@./media.sh optimize "$(DIR)"
