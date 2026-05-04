.PHONY: run check syntax explain help

# Variables
CONFIG ?= desktop
PLAYBOOK = playbooks/$(CONFIG).yml
INVENTORY = inventory

help:
	@echo "Genesis Workstation Makefile"
	@echo "---------------------------"
	@echo "make run      - Run the playbook (default: CONFIG=desktop)"
	@echo "                Usage: make run CONFIG=essential"
	@echo "make check    - Run in dry-run mode"
	@echo "make syntax   - Check playbook syntax"
	@echo "make list     - List all tasks"
	@echo "make explain  - Show hosts and mapped variables"
	@echo "make bootstrap - Run the bootstrap script"

EXTRA_ARGS ?= --ask-become-pass

bootstrap:
	chmod +x bootstrap.sh
	./bootstrap.sh

run:
	ansible-playbook -i $(INVENTORY) $(PLAYBOOK) $(EXTRA_ARGS)

check:
	ansible-playbook -i $(INVENTORY) $(PLAYBOOK) --check $(EXTRA_ARGS)

syntax:
	ansible-playbook -i $(INVENTORY) $(PLAYBOOK) --syntax-check

list:
	ansible-playbook -i $(INVENTORY) $(PLAYBOOK) --list-tasks

explain:
	ansible-inventory --list -y
