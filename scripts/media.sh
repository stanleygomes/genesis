#!/usr/bin/env bash

# Exit on error
set -e

COMMAND="${1:-help}"

# Helper function to display usage help
show_help() {
    echo "=========================================="
    echo "🎬 Genesis Media Tools CLI"
    echo "=========================================="
    echo "Uso:"
    echo "  ./media.sh download [URL] [FORMAT] [DEST_DIR] [BROWSER]"
    echo "  ./media.sh optimize [TARGET_DIR]"
    echo ""
    echo "Subcomandos e Exemplos:"
    echo "  download  - Baixa mídia de qualquer plataforma (YouTube via yt-dlp ou Spotify via spotdl)"
    echo "              Formatos para YouTube: mp4 (vídeo), mp3 (áudio)"
    echo "              URLs do Spotify (spotify.com) são identificadas e baixadas via spotDL automaticamente."
    echo "              Ex: ./media.sh download \"https://youtube.com/...\" mp4 ./downloads chrome"
    echo "              Ex: ./media.sh download \"https://open.spotify.com/track/...\""
    echo ""
    echo "  optimize  - Transcodifica e otimiza mídias de uma pasta para H.264 + AAC (.mp4)"
    echo "              Valida se o vídeo já está em H.264/AAC no container .mp4."
    echo "              Se já estiver válido, ignora o re-encode mantendo compatibilidade Chromecast."
    echo "              Ex: ./media.sh optimize \"/caminho/para/pasta\""
    echo "=========================================="
}

# --- Module: Spotify Download via spotdl ---
do_spotify() {
    local url="${1:-}"
    local dest_dir="${2:-./downloads}"

    if [ -z "${url}" ]; then
        echo "❌ Erro: Informe a URL da faixa, álbum ou playlist do Spotify."
        echo "Exemplo: ./media.sh spotify \"https://open.spotify.com/track/...\""
        exit 1
    fi

    # Check dependencies
    if ! command -v spotdl &> /dev/null; then
        echo "❌ Erro: 'spotdl' não está instalado no sistema."
        echo "Rode 'pip install spotdl' ou 'make install' para instalar as dependências."
        exit 1
    fi

    mkdir -p "${dest_dir}"

    echo "=========================================="
    echo "🎵 Iniciando download do Spotify (spotDL)"
    echo "🌐 URL: ${url}"
    echo "📂 Destino: ${dest_dir}"
    echo "=========================================="

    spotdl download "${url}" --output "${dest_dir}"

    echo "=========================================="
    echo "✅ Download do Spotify concluído com sucesso!"
    echo "=========================================="
}

# --- Module: YouTube / General Download ---
do_download() {
    local url="${1:-}"
    local format="${2:-mp4}"
    local dest_dir="${3:-./downloads}"
    local browser="${4:-chrome}"

    if [ -z "${url}" ]; then
        echo "❌ Erro: Informe a URL do vídeo, música ou playlist."
        echo "Exemplo: ./media.sh download \"https://www.youtube.com/watch?v=...\" mp4"
        exit 1
    fi

    # Auto-detect Spotify URLs
    if [[ "${url}" =~ spotify\.com ]]; then
        echo "💡 URL do Spotify detectada! Redirecionando para o módulo spotDL..."
        do_spotify "${url}" "${dest_dir}"
        return 0
    fi

    # Check dependencies
    if ! command -v yt-dlp &> /dev/null; then
        echo "❌ Erro: 'yt-dlp' não está instalado no sistema."
        echo "Rode 'make install' para instalar o yt-dlp e ffmpeg."
        exit 1
    fi

    mkdir -p "${dest_dir}"

    echo "=========================================="
    echo "⬇️  Iniciando download do YouTube"
    echo "🌐 URL: ${url}"
    echo "🎞️  Formato: ${format}"
    echo "📂 Destino: ${dest_dir}"
    echo "🌐 Navegador para cookies: ${browser}"
    echo "=========================================="

    if [ "${format}" = "mp3" ]; then
        yt-dlp -x --audio-format mp3 --audio-quality 0 \
            --js-runtimes node \
            --remote-components ejs:github \
            --cookies-from-browser "${browser}" \
            --download-archive "${dest_dir}/archive.txt" \
            --no-update \
            --ignore-errors \
            --progress \
            --console-title \
            --embed-thumbnail \
            --embed-metadata \
            -o "${dest_dir}/%(playlist_index)s - %(title)s.%(ext)s" \
            "${url}"
    else
        yt-dlp -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]/mp4" \
            --js-runtimes node \
            --remote-components ejs:github \
            --cookies-from-browser "${browser}" \
            --download-archive "${dest_dir}/archive.txt" \
            --no-update \
            --ignore-errors \
            --progress \
            --console-title \
            --embed-thumbnail \
            --embed-metadata \
            -o "${dest_dir}/%(playlist_index)s - %(title)s.%(ext)s" \
            "${url}"
    fi

    echo "=========================================="
    echo "✅ Download concluído com sucesso!"
    echo "=========================================="
}

# --- Module: Smart Transcoding / Optimization (Chromecast Validation) ---
do_optimize() {
    local target_dir="${1:-.}"
    local output_dir="${target_dir}/optimized"

    if ! command -v ffmpeg &> /dev/null || ! command -v ffprobe &> /dev/null; then
        echo "❌ Erro: 'ffmpeg' e/ou 'ffprobe' não estão instalados no sistema."
        echo "Rode 'make install' para instalar as dependências."
        exit 1
    fi

    mkdir -p "${output_dir}"

    shopt -s nullglob
    local files=("${target_dir}"/*.mp4 "${target_dir}"/*.MP4 "${target_dir}"/*.mkv "${target_dir}"/*.MKV "${target_dir}"/*.avi "${target_dir}"/*.AVI "${target_dir}"/*.mov "${target_dir}"/*.MOV "${target_dir}"/*.webm "${target_dir}"/*.WEBM)

    if [ ${#files[@]} -eq 0 ]; then
        echo "⚠️  Nenhum arquivo de mídia encontrado no diretório '${target_dir}'."
        exit 0
    fi

    echo "=========================================="
    echo "🎬 Iniciando inspeção e otimização inteligente de mídia"
    echo "📂 Diretório alvo: ${target_dir}"
    echo "📁 Subpasta de saída: ${output_dir}"
    echo "=========================================="

    for file in "${files[@]}"; do
        local filename
        local filename_no_ext
        local ext
        local output_file

        filename=$(basename "${file}")
        filename_no_ext="${filename%.*}"
        ext="${filename##*.}"
        ext_lc=$(echo "${ext}" | tr '[:upper:]' '[:lower:]')
        output_file="${output_dir}/${filename_no_ext}.mp4"

        # Skip if output file already exists in optimized/
        if [ -f "${output_file}" ]; then
            echo "⏭️  Pulando '${filename}': Arquivo já processado existe em 'optimized/'."
            continue
        fi

        echo "⚙️  Inspecionando: ${filename} ..."

        # Extract video and audio codecs using ffprobe
        local video_codec
        local audio_codec
        video_codec=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of default=noprint_wrappers=1:keyvalue=1 "${file}" | cut -d= -f2 || true)
        audio_codec=$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of default=noprint_wrappers=1:keyvalue=1 "${file}" | cut -d= -f2 || true)

        # Regra de Validação Chromecast: Video == h264 && Audio == aac && Extensão == mp4
        if [ "${video_codec}" = "h264" ] && [ "${audio_codec}" = "aac" ] && [ "${ext_lc}" = "mp4" ]; then
            echo "✅ '${filename}' já está em H.264 + AAC (.mp4). Nenhuma transcodificação necessária!"
            continue
        fi

        echo "🚀 Transcodificando '${filename}' [Vídeo: ${video_codec:-desconhecido} -> h264 | Áudio: ${audio_codec:-desconhecido} -> aac] ..."

        local vcodec_arg="libx264 -crf 24 -preset fast"
        if [ "${video_codec}" = "h264" ]; then
            echo "⚡ Vídeo já está em H.264. Copiando stream de vídeo sem re-encode..."
            vcodec_arg="copy"
        fi

        local acodec_arg="aac -b:a 192k"
        if [ "${audio_codec}" = "aac" ]; then
            echo "⚡ Áudio já está em AAC. Copiando stream de áudio sem re-encode..."
            acodec_arg="copy"
        fi

        ffmpeg -hide_banner -loglevel error -stats -i "${file}" \
            -c:v ${vcodec_arg} -c:a ${acodec_arg} -movflags +faststart "${output_file}"

        local orig_size
        local new_size
        orig_size=$(du -h "${file}" | cut -f1)
        new_size=$(du -h "${output_file}" | cut -f1)
        echo "✅ Concluído: ${filename} -> ${filename_no_ext}.mp4 [Original: ${orig_size} -> Otimizado: ${new_size}]"
        echo "------------------------------------------"
    done

    echo "🎉 Otimização inteligente concluída com sucesso!"
}

case "${COMMAND}" in
    download)
        do_download "${2:-}" "${3:-mp4}" "${4:-./downloads}" "${5:-chrome}"
        ;;
    optimize)
        do_optimize "${2:-.}"
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo "❌ Subcomando desconhecido: '${COMMAND}'"
        show_help
        exit 1
        ;;
esac
