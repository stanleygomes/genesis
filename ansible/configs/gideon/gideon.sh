#!/usr/bin/env bash

# Exit on error
set -e

COMMAND="${1:-help}"

# Helper function to display usage help
show_help() {
    echo "=========================================="
    echo "🎬 Gideon Media Tools CLI"
    echo "=========================================="
    echo "Usage:"
    echo "  ./gideon.sh install"
    echo "  ./gideon.sh download [URL] [FORMAT] [DEST_DIR] [BROWSER]"
    echo "  ./gideon.sh convert [TARGET_DIR]"
    echo ""
    echo "Subcommands & Examples:"
    echo "  install   - Install system dependencies (yt-dlp, ffmpeg, spotdl, etc.)"
    echo "  download  - Download video or audio (YouTube via yt-dlp or Spotify via spotdl)"
    echo "              Automatically detects single item vs playlist."
    echo "              For playlists, creates a subfolder named after the playlist."
    echo "              Executes automatic Chromecast validation (H.264/AAC) on MP4 downloads."
    echo "              Ex: ./gideon.sh download \"https://youtube.com/...\" mp4 ./downloads chrome"
    echo "              Ex: ./gideon.sh download \"https://open.spotify.com/track/...\""
    echo ""
    echo "  convert   - Transcode and optimize media files in a directory to H.264 + AAC (.mp4)"
    echo "              Validates if video is already H.264/AAC inside an .mp4 container."
    echo "              If valid, skips re-encoding while preserving Chromecast compatibility."
    echo "              Ex: ./gideon.sh convert \"/path/to/folder\""
    echo "=========================================="
}

# --- Helper: Sanitize folder name ---
sanitize_folder_name() {
    echo "$1" | sed -e 's/[^A-Za-z0-9 _-]/_/g' -e 's/_+/_/g' -e 's/^ *//;s/ *$//'
}

# --- Module: System Dependency Installation ---
do_install() {
    echo "📦 Installing system dependencies (yt-dlp, ffmpeg, spotdl)..."
    sudo apt update && sudo apt install -y yt-dlp ffmpeg python3-pip python3-secretstorage python3-cryptography
    pip3 install --break-system-packages spotdl || pip3 install spotdl
    echo "📦 Setting up Deno JS engine for spotDL..."
    spotdl --download-deno || true
    echo "✅ Gideon dependencies installed successfully!"
}

# --- Module: Spotify Download via spotdl ---
do_spotify() {
    local url="${1:-}"
    local dest_dir="${2:-.}"

    if [ -z "${url}" ]; then
        echo "❌ Error: Please specify a Spotify track, album, or playlist URL."
        echo "Example: ./gideon.sh download \"https://open.spotify.com/track/...\""
        exit 1
    fi

    if ! command -v spotdl &> /dev/null; then
        echo "❌ Error: 'spotdl' is not installed."
        echo "Run 'gideon install' to install dependencies."
        exit 1
    fi

    local output_template="{list-name}/{artist} - {title}.{output-ext}"
    if [[ "${url}" =~ /track/ ]]; then
        output_template="{artist} - {title}.{output-ext}"
    fi

    mkdir -p "${dest_dir}"

    echo "=========================================="
    echo "🎵 Starting Spotify download (spotDL)"
    echo "🌐 URL: ${url}"
    echo "📂 Base Destination: ${dest_dir}"
    echo "📁 Output Pattern: ${output_template}"
    echo "=========================================="

    spotdl download "${url}" --output "${dest_dir}/${output_template}"

    echo "=========================================="
    echo "✅ Spotify download completed successfully!"
    echo "=========================================="
}

# --- Module: YouTube / General Download ---
do_download() {
    local url="${1:-}"
    local format="${2:-mp4}"
    local dest_dir="${3:-.}"
    local browser="${4:-none}"
    local cookie_args=()
    if [ -n "${browser}" ] && [ "${browser}" != "none" ] && [ "${browser}" != "false" ]; then
        cookie_args=(--cookies-from-browser "${browser}")
    fi

    if [ -z "${url}" ]; then
        echo "❌ Error: Please specify a video, track, or playlist URL."
        echo "Example: ./gideon.sh download \"https://www.youtube.com/watch?v=...\" mp4"
        exit 1
    fi

    # Auto-detect Spotify URLs
    if [[ "${url}" =~ spotify\.com ]]; then
        echo "💡 Spotify URL detected! Redirecting to spotDL module..."
        do_spotify "${url}" "${dest_dir}"
        return 0
    fi

    if ! command -v yt-dlp &> /dev/null; then
        echo "❌ Error: 'yt-dlp' is not installed."
        echo "Run 'gideon install' to install dependencies."
        exit 1
    fi

    echo "🔍 Checking URL (Single item vs Playlist)..."
    local playlist_title
    playlist_title=$(yt-dlp --print playlist_title --playlist-items 1 --no-warnings "${url}" 2>/dev/null | head -n 1 || true)

    local target_output_dir="${dest_dir}"
    local output_template="%(title)s.%(ext)s"

    if [[ "${url}" =~ playlist\?list= ]] || [[ "${url}" =~ \&list= ]] || [ -n "${playlist_title}" -a "${playlist_title}" != "NA" ]; then
        output_template="%(playlist_title,playlist)s/%(playlist_index)s - %(title)s.%(ext)s"
        echo "📁 Playlist detected -> Output pattern set to subfolder: %(playlist_title,playlist)s/"
    else
        echo "🎵 Single item detected."
    fi

    mkdir -p "${target_output_dir}"

    echo "=========================================="
    echo "⬇️  Starting YouTube download"
    echo "🌐 URL: ${url}"
    echo "🎞️  Format: ${format}"
    echo "📂 Destination: ${target_output_dir}"
    if [ ${#cookie_args[@]} -gt 0 ]; then
        echo "🌐 Browser for cookies: ${browser}"
    fi
    echo "=========================================="

    if [ "${format}" = "mp3" ]; then
        yt-dlp -x --audio-format mp3 --audio-quality 0 \
            --js-runtimes node \
            --remote-components ejs:github \
            "${cookie_args[@]}" \
            --download-archive "${target_output_dir}/archive.txt" \
            --no-update \
            --ignore-errors \
            --progress \
            --console-title \
            --embed-thumbnail \
            --embed-metadata \
            -o "${target_output_dir}/${output_template}" \
            "${url}"
    else
        yt-dlp -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]/mp4" \
            --js-runtimes node \
            --remote-components ejs:github \
            "${cookie_args[@]}" \
            --download-archive "${target_output_dir}/archive.txt" \
            --no-update \
            --ignore-errors \
            --progress \
            --console-title \
            --embed-thumbnail \
            --embed-metadata \
            -o "${target_output_dir}/${output_template}" \
            "${url}"

        echo "=========================================="
        echo "🔍 Running automatic Chromecast validation (H.264 + AAC)..."
        echo "=========================================="
        do_convert "${target_output_dir}"
    fi

    echo "=========================================="
    echo "✅ Download and processing completed successfully!"
    echo "=========================================="
}

# --- Module: Smart Transcoding / Optimization (Chromecast Validation) ---
do_convert() {
    local target_dir="${1:-.}"
    local output_dir="${target_dir}/optimized"

    if ! command -v ffmpeg &> /dev/null || ! command -v ffprobe &> /dev/null; then
        echo "❌ Error: 'ffmpeg' and/or 'ffprobe' are not installed."
        echo "Run 'gideon install' to install dependencies."
        exit 1
    fi

    mkdir -p "${output_dir}"

    shopt -s nullglob
    local files=("${target_dir}"/*.mp4 "${target_dir}"/*.MP4 "${target_dir}"/*.mkv "${target_dir}"/*.MKV "${target_dir}"/*.avi "${target_dir}"/*.AVI "${target_dir}"/*.mov "${target_dir}"/*.MOV "${target_dir}"/*.webm "${target_dir}"/*.WEBM)

    if [ ${#files[@]} -eq 0 ]; then
        echo "⚠️  No media files found in directory '${target_dir}'."
        exit 0
    fi

    echo "=========================================="
    echo "🎬 Starting smart media inspection & optimization"
    echo "📂 Target directory: ${target_dir}"
    echo "📁 Output subfolder: ${output_dir}"
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
            echo "⏭️  Skipping '${filename}': Processed file already exists in 'optimized/'."
            continue
        fi

        echo "⚙️  Inspecting: ${filename} ..."

        # Extract video and audio codecs using ffprobe
        local video_codec
        local audio_codec
        video_codec=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of default=noprint_wrappers=1:keyvalue=1 "${file}" | cut -d= -f2 || true)
        audio_codec=$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of default=noprint_wrappers=1:keyvalue=1 "${file}" | cut -d= -f2 || true)

        # Chromecast Validation Rule: Video == h264 && Audio == aac && Extension == mp4
        if [ "${video_codec}" = "h264" ] && [ "${audio_codec}" = "aac" ] && [ "${ext_lc}" = "mp4" ]; then
            echo "✅ '${filename}' is already H.264 + AAC (.mp4). No transcoding needed!"
            continue
        fi

        echo "🚀 Transcoding '${filename}' [Video: ${video_codec:-unknown} -> h264 | Audio: ${audio_codec:-unknown} -> aac] ..."

        local vcodec_arg="libx264 -crf 24 -preset fast"
        if [ "${video_codec}" = "h264" ]; then
            echo "⚡ Video is already H.264. Copying video stream without re-encode..."
            vcodec_arg="copy"
        fi

        local acodec_arg="aac -b:a 192k"
        if [ "${audio_codec}" = "aac" ]; then
            echo "⚡ Audio is already AAC. Copying audio stream without re-encode..."
            acodec_arg="copy"
        fi

        ffmpeg -hide_banner -loglevel error -stats -i "${file}" \
            -c:v ${vcodec_arg} -c:a ${acodec_arg} -movflags +faststart "${output_file}"

        local orig_size
        local new_size
        orig_size=$(du -h "${file}" | cut -f1)
        new_size=$(du -h "${output_file}" | cut -f1)
        echo "✅ Completed: ${filename} -> ${filename_no_ext}.mp4 [Original: ${orig_size} -> Optimized: ${new_size}]"
        echo "------------------------------------------"
    done

    echo "🎉 Smart optimization completed successfully!"
}

case "${COMMAND}" in
    install)
        do_install
        ;;
    download)
        do_download "${2:-}" "${3:-mp4}" "${4:-.}" "${5:-chrome}"
        ;;
    convert|optimize)
        do_convert "${2:-.}"
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo "❌ Unknown subcommand: '${COMMAND}'"
        show_help
        exit 1
        ;;
esac
