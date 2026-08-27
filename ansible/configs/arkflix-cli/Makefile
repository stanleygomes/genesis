# Arkflix Media Tools Makefile
# Provisioned at ~/.config/arkflix/ via Genesis Ansible

# Configurable variables
URL ?= ""
FORMAT ?= mp4
DIR ?= .
DEST_DIR ?= $(DIR)
BROWSER ?= none

.PHONY: help install download convert optimize

# Default help
help:
	@echo "=========================================="
	@echo "🎬 Arkflix Media Tools Makefile"
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
	@chmod +x ./arkflix.sh
	@./arkflix.sh install

# Download Module (YouTube via yt-dlp or Spotify via spotdl with auto-detection)
download:
	@chmod +x ./arkflix.sh
	@URL_VAL="$(URL)"; \
	if [ -z "$$URL_VAL" ]; then \
		URL_VAL="$(filter-out download,$(MAKECMDGOALS))"; \
	fi; \
	./arkflix.sh download "$$URL_VAL" "$(FORMAT)" "$(DEST_DIR)" "$(BROWSER)"

%:
	@:

# Smart Transcoding Module (Chromecast Validation: H.264 + AAC + .mp4)
convert:
	@chmod +x ./arkflix.sh
	@DIR_VAL="$(DIR)"; \
	if [ "$$DIR_VAL" = "." ]; then \
		POS_ARG="$(filter-out convert optimize,$(MAKECMDGOALS))"; \
		if [ -n "$$POS_ARG" ]; then DIR_VAL="$$POS_ARG"; fi; \
	fi; \
	./arkflix.sh convert "$$DIR_VAL"

# Compatibility alias for convert
optimize: convert
