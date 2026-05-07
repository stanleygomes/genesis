import os

def show_summary(config_str, extra_vars):
    """Shows an installation summary in the console."""
    print("\n" + "="*50)
    print("🚀 INSTALLATION SUMMARY")
    print("="*50)
    print(f"Playbooks: {config_str}")
    if extra_vars:
        print(f"Custom variables: {', '.join(extra_vars)}")
    print("="*50 + "\n")

def execute(config_str, extra_vars):
    """Assembles and executes the final Ansible command via Make."""
    extra_args = ""
    if extra_vars:
        vars_str = " ".join(extra_vars)
        extra_args = f"EXTRA_ARGS='-e \"{vars_str}\"'"

    command = f"make run CONFIG=\"{config_str}\" {extra_args}"
    
    show_summary(config_str, extra_vars)
    os.system(command)
