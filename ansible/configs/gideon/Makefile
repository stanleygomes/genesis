# Gideon Media Tools Makefile
# Provisioned at ~/.config/gideon/ via Genesis Ansible

# Configurable variables
URL ?= ""
FORMAT ?= mp4
DIR ?= .
DEST_DIR ?= $(DIR)
BROWSER ?= chrome

.PHONY: help install download convert optimize

# Default help
help:
	@echo "=========================================="
	@echo "🎬 Gideon Media Tools Makefile"
	@echo "=========================================="
	@echo "Usage:"
	@echo "  make install                                         - Install yt-dlp, ffmpeg, spotdl and system dependencies"
	@echo "  make download URL=\"...\" FORMAT=mp4                  - Download MP4 video in target directory (default)"
	@echo "  make download URL=\"...\" FORMAT=mp3                  - Download MP3 audio in target directory"
	@echo "  make download URL=\"https://open.spotify.com/...\"    - Download Spotify in MP3 via spotDL (Auto-detect)"
	@echo "  make convert                                         - Convert/Optimize media files in current folder to H.264+AAC (.mp4)"
	@echo "  make convert DIR=\"/path/to/folder\"                  - Convert media files in specified folder"
	@echo "=========================================="

# Install dependencies
install:
	@chmod +x ./gideon.sh
	@./gideon.sh install

# Download Module (YouTube via yt-dlp or Spotify via spotdl with auto-detection)
download:
	@chmod +x ./gideon.sh
	@URL_VAL="$(URL)"; \
	if [ -z "$$URL_VAL" ]; then \
		URL_VAL="$(filter-out download,$(MAKECMDGOALS))"; \
	fi; \
	./gideon.sh download "$$URL_VAL" "$(FORMAT)" "$(DEST_DIR)" "$(BROWSER)"

%:
	@:

# Smart Transcoding Module (Chromecast Validation: H.264 + AAC + .mp4)
convert:
	@chmod +x ./gideon.sh
	@./gideon.sh convert "$(DIR)"

# Compatibility alias for convert
optimize: convert
