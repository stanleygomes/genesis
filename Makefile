.PHONY: run check syntax explain help

# Variables
PLAYBOOK = local.yml
INVENTORY = inventory

help:
	@echo "Genesis Workstation Makefile"
	@echo "---------------------------"
	@echo "make run      - Run the main playbook"
	@echo "make check    - Run in dry-run mode (simulation)"
	@echo "make syntax   - Check playbook syntax"
	@echo "make list     - List all tasks that would be executed"
	@echo "make explain  - Show hosts and mapped variables"

run:
	ansible-playbook -i $(INVENTORY) $(PLAYBOOK) --ask-become-pass

check:
	ansible-playbook -i $(INVENTORY) $(PLAYBOOK) --check --ask-become-pass

syntax:
	ansible-playbook -i $(INVENTORY) $(PLAYBOOK) --syntax-check

list:
	ansible-playbook -i $(INVENTORY) $(PLAYBOOK) --list-tasks

explain:
	ansible-inventory --list -y
