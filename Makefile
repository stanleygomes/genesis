.PHONY: run check syntax explain help patmos patmos-check

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
	@echo "make patmos   - Rebuild and reinstall Patmos (Isle fork) from"
	@echo "                ~/projects/patmos; FORCE=1 rebuilds unchanged trees"

EXTRA_ARGS ?= --ask-become-pass

bootstrap:
	chmod +x bootstrap.sh
	./bootstrap.sh

run:
	cd ansible && ansible-playbook -i $(INVENTORY) $(PLAYBOOK_FILES) $(EXTRA_ARGS)

check:
	cd ansible && ansible-playbook -i $(INVENTORY) $(PLAYBOOK_FILES) --check $(EXTRA_ARGS)

syntax:
	cd ansible && ansible-playbook -i $(INVENTORY) $(PLAYBOOK_FILES) --syntax-check

list:
	cd ansible && ansible-playbook -i $(INVENTORY) $(PLAYBOOK_FILES) --list-tasks

explain:
	cd ansible && ansible-inventory --list -y

# Patmos (Isle fork): rebuilds from the local checkout without sudo. Build
# dependencies (patmos_deps) are installed by `make run CONFIG=desktop`.
PATMOS_ARGS = $(PLAYBOOKS_DIR)/desktop.yml --tags patmos --skip-tags patmos_deps
FORCE ?= 0

patmos:
	cd ansible && ansible-playbook -i $(INVENTORY) $(PATMOS_ARGS) \
		-e patmos_force_reinstall=$(if $(filter 1,$(FORCE)),true,false)

patmos-check:
	cd ansible && ansible-playbook -i $(INVENTORY) $(PATMOS_ARGS) --check --diff
