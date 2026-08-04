# Variáveis
URL ?= ""
DEST_DIR ?= ./downloads

.PHONY: install playlist-download help

# Ajuda padrao
help:
	@echo "Uso:"
	@echo "  make install         - Instala yt-dlp e ffmpeg no sistema"
	@echo "  make playlist-download URL=\"...\" - Baixa a playlist inteira em MP4"

# Instala as dependencias via apt
install:
	@echo "📦 Instalando yt-dlp e ffmpeg..."
	sudo apt update && sudo apt install -y yt-dlp ffmpeg
	@echo "✅ Instalação concluída!"

# Baixa a playlist informada na variavel URL (com capa e metadados)
playlist-download:
	@if [ -z $(URL) ]; then \
		echo "❌ Erro: Informe a URL da playlist."; \
		echo "Exemplo: make playlist-download URL=\"https://www.youtube.com/playlist?list=XXX\""; \
		exit 1; \
	fi
	@echo "⬇️ Baixando playlist com capas e metadados para $(DEST_DIR)..."
	mkdir -p $(DEST_DIR)
	yt-dlp -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4] / mp4" \
		--embed-thumbnail \
		--write-thumbnail \
		--convert-thumbnails jpg \
		--embed-metadata \
		-o "$(DEST_DIR)/%(playlist_index)s - %(title)s.%(ext)s" \
		"$(URL)"
	@echo "✅ Download concluído!"
