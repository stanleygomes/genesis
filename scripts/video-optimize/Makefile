# Variáveis
DIR ?= .

.PHONY: optimize install help

# Ajuda padrão
help:
	@echo "Uso:"
	@echo "  make install           - Instala o ffmpeg no sistema via apt"
	@echo "  make optimize          - Otimiza e converte arquivos .mp4 e .mkv da pasta atual para .mp4 em ./optimized"
	@echo "  make optimize DIR=\"...\" - Otimiza vídeos .mp4 e .mkv da pasta especificada"
	@echo "  make convert-mkv DIR=\"...\" - Converte APENAS arquivos .mkv para .mp4 na pasta especificada"

# Instala as dependências via apt
install:
	@echo "📦 Instalando ffmpeg..."
	sudo apt update && sudo apt install -y ffmpeg
	@echo "✅ Instalação concluída!"

# Executa o script de otimização de vídeos (MP4 e MKV)
optimize:
	@chmod +x ./optimize-videos.sh
	@./optimize-videos.sh "$(DIR)"

# Converte APENAS arquivos MKV para MP4
convert-mkv:
	@chmod +x ./optimize-videos.sh
	@./optimize-videos.sh "$(DIR)" "mkv"
