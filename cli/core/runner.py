import subprocess
import shlex
import sys

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
    extra_args_val = ""
    if extra_vars:
        vars_str = " ".join(extra_vars)
        extra_args_val = f"-e {shlex.quote(vars_str)}"

    cmd = ["make", "run", f"CONFIG={config_str}"]
    if extra_args_val:
        cmd.append(f"EXTRA_ARGS={extra_args_val}")
    
    show_summary(config_str, extra_vars)
    
    try:
        subprocess.run(cmd, check=True)
    except subprocess.CalledProcessError as e:
        print(f"\n❌ Error during execution: {e}")
        sys.exit(e.returncode)
    except KeyboardInterrupt:
        print("\n⚠️  Execution interrupted by user.")
        sys.exit(1)
