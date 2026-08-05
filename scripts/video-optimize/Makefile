# Variáveis
DIR ?= .

.PHONY: optimize install help

# Ajuda padrão
help:
	@echo "Uso:"
	@echo "  make install           - Instala o ffmpeg no sistema via apt"
	@echo "  make optimize          - Otimiza todos os arquivos .mp4 da pasta atual e salva em ./optimized"
	@echo "  make optimize DIR=\"/caminho/para/pasta\" - Otimiza os vídeos da pasta especificada"

# Instala as dependências via apt
install:
	@echo "📦 Instalando ffmpeg..."
	sudo apt update && sudo apt install -y ffmpeg
	@echo "✅ Instalação concluída!"

# Executa o script de otimização de vídeos
optimize:
	@chmod +x ./optimize-videos.sh
	@./optimize-videos.sh "$(DIR)"
