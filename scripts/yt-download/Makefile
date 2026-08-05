# Variáveis
URL ?= ""
DEST_DIR ?= ./downloads
BROWSER ?= chrome

.PHONY: install playlist-download help

# Ajuda padrao
help:
	@echo "Uso:"
	@echo "  make install                                     - Instala yt-dlp, ffmpeg e dependências de cookies no sistema"
	@echo "  make playlist-download URL=\"...\"                 - Baixa a playlist inteira em MP4"
	@echo "  make playlist-download URL=\"...\" BROWSER=chrome  - Baixa usando cookies do navegador (chrome, firefox, brave, edge)"

# Instala as dependencias via apt
install:
	@echo "📦 Instalando yt-dlp, ffmpeg e bibliotecas para cookies..."
	sudo apt update && sudo apt install -y yt-dlp ffmpeg python3-secretstorage python3-cryptography
	@echo "✅ Instalação concluída!"

# Baixa a playlist informada na variavel URL (com suporte a cookies para evitar bloqueio de bot/login)
playlist-download:
	@if [ -z $(URL) ]; then \
		echo "❌ Erro: Informe a URL da playlist."; \
		echo "Exemplo: make playlist-download URL=\"https://www.youtube.com/playlist?list=XXX\""; \
		exit 1; \
	fi
	@echo "=========================================="
	@echo "⬇️  Iniciando/Continuando download da Playlist"
	@echo "📂 Destino: $(DEST_DIR)"
	@echo "🌐 Navegador para cookies: $(BROWSER)"
	@echo "=========================================="
	mkdir -p $(DEST_DIR)
	yt-dlp -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]/mp4" \
		--js-runtimes node \
		--remote-components ejs:github \
		--cookies-from-browser $(BROWSER) \
		--download-archive "$(DEST_DIR)/archive.txt" \
		--no-update \
		--ignore-errors \
		--progress \
		--console-title \
		--embed-thumbnail \
		--embed-metadata \
		-o "$(DEST_DIR)/%(playlist_index)s - %(title)s.%(ext)s" \
		"$(URL)"
	@echo "=========================================="
	@echo "✅ Processo concluído!"
	@echo "=========================================="
