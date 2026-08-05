#!/usr/bin/env bash

# Exit on error
set -e

# Target directory (defaults to current directory if not specified)
TARGET_DIR="${1:-.}"

# Subdirectory to store optimized videos
OUTPUT_DIR="${TARGET_DIR}/optimized"

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ Erro: 'ffmpeg' não está instalado no sistema."
    echo "Rode 'make install' para instalar o ffmpeg."
    exit 1
fi

# Create output directory if it doesn't exist
mkdir -p "${OUTPUT_DIR}"

# Enable nullglob to avoid error if no .mp4 files are found
shopt -s nullglob
files=("${TARGET_DIR}"/*.mp4 "${TARGET_DIR}"/*.MP4)

if [ ${#files[@]} -eq 0 ]; then
    echo "⚠️  Nenhum arquivo .mp4 encontrado no diretório '${TARGET_DIR}'."
    exit 0
fi

echo "=========================================="
echo "🎬 Iniciando otimização de vídeos MP4"
echo "📂 Diretório alvo: ${TARGET_DIR}"
echo "📁 Subpasta de saída: ${OUTPUT_DIR}"
echo "=========================================="

for file in "${files[@]}"; do
    filename=$(basename "${file}")
    output_file="${OUTPUT_DIR}/${filename}"

    # Skip if output file already exists
    if [ -f "${output_file}" ]; then
        echo "⏭️  Pulando '${filename}': Arquivo otimizado já existe em 'optimized/'."
        continue
    fi

    echo "⚙️  Processando: ${filename} ..."
    
    # FFmpeg parameters:
    # -c:v libx264 : Codec H.264 altamente compatível
    # -crf 23     : Constant Rate Factor (23 oferece ótimo equilíbrio qualidade/tamanho)
    # -preset slow : Melhor taxa de compressão sem perda de qualidade visual
    # -c:a copy   : Copia a faixa de áudio sem perda de qualidade ou re-encode desnecessário
    ffmpeg -hide_banner -loglevel error -stats -i "${file}" \
        -c:v libx264 -crf 23 -preset slow -c:a copy "${output_file}"

    orig_size=$(du -h "${file}" | cut -f1)
    new_size=$(du -h "${output_file}" | cut -f1)
    echo "✅ Concluído: ${filename} [Original: ${orig_size} -> Otimizado: ${new_size}]"
    echo "------------------------------------------"
done

echo "🎉 Otimização concluída com sucesso!"
