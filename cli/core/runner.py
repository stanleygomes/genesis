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

def has_passwordless_sudo():
    """Checks if passwordless sudo is available for the current user."""
    try:
        res = subprocess.run(
            ["sudo", "-n", "true"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=False
        )
        return res.returncode == 0
    except Exception:
        return False

def execute(config_str, extra_vars):
    """Assembles and executes the final Ansible command via Make."""
    # Append --ask-become-pass only if passwordless sudo is not configured
    extra_args_val = ""
    if not has_passwordless_sudo():
        extra_args_val = "--ask-become-pass"

    if extra_vars:
        vars_str = " ".join(extra_vars)
        if extra_args_val:
            extra_args_val += f" -e {shlex.quote(vars_str)}"
        else:
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
