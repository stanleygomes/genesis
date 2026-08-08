#!/usr/bin/env bash

# Exit on error
set -e

# Target directory (defaults to current directory if not specified)
TARGET_DIR="${1:-.}"
# Optional filter extension: pass "mkv" as second argument to process ONLY .mkv files
EXT_FILTER="${2:-all}"

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

# Enable nullglob to avoid error if no matching files are found
shopt -s nullglob
if [ "${EXT_FILTER}" = "mkv" ]; then
    files=("${TARGET_DIR}"/*.mkv "${TARGET_DIR}"/*.MKV)
else
    files=("${TARGET_DIR}"/*.mp4 "${TARGET_DIR}"/*.MP4 "${TARGET_DIR}"/*.mkv "${TARGET_DIR}"/*.MKV)
fi

if [ ${#files[@]} -eq 0 ]; then
    echo "⚠️  Nenhum arquivo correspondente encontrado no diretório '${TARGET_DIR}'."
    exit 0
fi

echo "=========================================="
echo "🎬 Iniciando otimização/conversão de vídeos (MP4 e MKV)"
echo "📂 Diretório alvo: ${TARGET_DIR}"
echo "📁 Subpasta de saída: ${OUTPUT_DIR}"
echo "=========================================="

for file in "${files[@]}"; do
    filename=$(basename "${file}")
    filename_no_ext="${filename%.*}"
    output_file="${OUTPUT_DIR}/${filename_no_ext}.mp4"

    # Skip if output file already exists
    if [ -f "${output_file}" ]; then
        echo "⏭️  Pulando '${filename}': Arquivo otimizado/convertido já existe em 'optimized/'."
        continue
    fi

    echo "⚙️  Processando: ${filename} -> ${filename_no_ext}.mp4 ..."
    
    # Verifica se o codec de vídeo original já é H.264/AVC
    video_codec=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of default=noprint_wrappers=1:keyvalue=1 "${file}" | cut -d= -f2)

    if [ "${video_codec}" = "h264" ]; then
        echo "⚡ Vídeo já está em H.264! Fazendo conversão ultrarrápida (remux de vídeo + conversão de áudio)..."
        ffmpeg -hide_banner -loglevel error -stats -i "${file}" \
            -c:v copy -c:a aac -b:a 192k -movflags +faststart "${output_file}"
    else
        echo "⚙️  Re-encodando vídeo (${video_codec} -> h264)..."
        ffmpeg -hide_banner -loglevel error -stats -i "${file}" \
            -c:v libx264 -crf 24 -preset fast -c:a aac -b:a 192k -movflags +faststart "${output_file}"
    fi

    orig_size_bytes=$(stat -c%s "${file}")
    new_size_bytes=$(stat -c%s "${output_file}")

    # Se a re-codificação completa deixou o arquivo maior, reverte para remux direto com áudio AAC
    if [ "${new_size_bytes}" -gt "${orig_size_bytes}" ] && [ "${video_codec}" != "h264" ]; then
        echo "⚠️  Arquivo re-encodado ficou maior. Mantendo vídeo original com áudio AAC..."
        ffmpeg -hide_banner -loglevel error -y -i "${file}" -c:v copy -c:a aac -b:a 192k -movflags +faststart "${output_file}"
    fi

    orig_size=$(du -h "${file}" | cut -f1)
    new_size=$(du -h "${output_file}" | cut -f1)
    echo "✅ Concluído: ${filename} [Original: ${orig_size} -> Otimizado/MP4: ${new_size}]"
    echo "------------------------------------------"
done

echo "🎉 Otimização e conversão concluídas com sucesso!"
