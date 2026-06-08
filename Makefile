.PHONY: run check syntax explain help

# Variables
CONFIG ?= desktop
PLAYBOOKS_DIR = playbooks
PLAYBOOK_FILES = $(foreach cfg,$(CONFIG),$(PLAYBOOKS_DIR)/$(cfg).yml)
INVENTORY = inventory

help:
	@echo "Genesis Workstation Makefile"
	@echo "---------------------------"
	@echo "make run      - Run the playbook (default: CONFIG=desktop)"
	@echo "                Usage: make run CONFIG=\"bash desktop\""
	@echo "make check    - Run in dry-run mode"
	@echo "make syntax   - Check playbook syntax"
	@echo "make list     - List all tasks"
	@echo "make explain  - Show hosts and mapped variables"
	@echo "make bootstrap - Run the bootstrap script"
	@echo "make install-cli - Install CLI dependencies using uv"

EXTRA_ARGS ?= --ask-become-pass

bootstrap:
	chmod +x bootstrap.sh
	./bootstrap.shm

install-cli:
	uv sync

run:
	ansible-playbook -i $(INVENTORY) $(PLAYBOOK_FILES) $(EXTRA_ARGS)

check:
	ansible-playbook -i $(INVENTORY) $(PLAYBOOK_FILES) --check $(EXTRA_ARGS)

syntax:
	ansible-playbook -i $(INVENTORY) $(PLAYBOOK_FILES) --syntax-check

list:
	ansible-playbook -i $(INVENTORY) $(PLAYBOOK_FILES) --list-tasks

explain:
	ansible-inventory --list -y
