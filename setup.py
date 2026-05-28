#!/usr/bin/env python3
import sys
import os
import subprocess
import shlex
import re

# ------------------------------------------------------------------------------
# Constants
# ------------------------------------------------------------------------------
PLAYBOOKS_DIR = "playbooks"
COMMON_PLAYBOOK = "common"

# ------------------------------------------------------------------------------
# UI Helpers (previously genesis/ui.py)
# ------------------------------------------------------------------------------
def run_whiptail(cmd):
    """Executes whiptail and captures stderr output."""
    result = subprocess.run(cmd, stderr=subprocess.PIPE)
    if result.returncode != 0:
        return None
    return result.stderr.decode().strip()

def checklist(title, text, options_list):
    """
    Shows a whiptail checklist menu.
    options_list: list of (tag, description, status)
    """
    options = []
    for tag, desc, status in options_list:
        options.extend([tag, desc, status])
    
    cmd = [
        "whiptail", "--title", title,
        "--checklist", text,
        "20", "78", "10"
    ] + options
    
    result = run_whiptail(cmd)
    if result is None: return []
    return re.findall(r'"([^"]*)"', result)

def inputbox(title, text, default=""):
    """Shows a text input box."""
    cmd = [
        "whiptail", "--title", title,
        "--inputbox", text,
        "10", "60", default
    ]
    return run_whiptail(cmd)

# ------------------------------------------------------------------------------
# Playbook Helpers (previously genesis/playbooks.py)
# ------------------------------------------------------------------------------
def get_available_playbooks():
    """Reads the playbooks directory and returns a list of names (except common)."""
    if not os.path.exists(PLAYBOOKS_DIR):
        return []
    
    playbooks = []
    for f in os.listdir(PLAYBOOKS_DIR):
        if f.endswith(".yml") and f != f"{COMMON_PLAYBOOK}.yml":
            playbooks.append(f.replace(".yml", ""))
    return sorted(playbooks)

def get_sub_options(playbook_name):
    """Reads the playbook file looking for the @sub-options line."""
    path = os.path.join(PLAYBOOKS_DIR, f"{playbook_name}.yml")
    if not os.path.exists(path):
        return []
    
    with open(path, "r") as f:
        for line in f:
            clean_line = line.strip()
            if clean_line.startswith("# @sub-options:"):
                options_str = clean_line.replace("# @sub-options:", "").strip()
                options = options_str.split(",")
                return [opt.strip() for opt in options if opt.strip()]
    return []

# ------------------------------------------------------------------------------
# Execution Helpers (previously genesis/runner.py)
# ------------------------------------------------------------------------------
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
    # Build the extra vars string safely
    extra_args_val = ""
    if extra_vars:
        vars_str = " ".join(extra_vars)
        extra_args_val = f"-e {shlex.quote(vars_str)}"

    # Use subprocess.run with a list of arguments to avoid shell quoting issues
    cmd = ["make", "run", f"CONFIG={config_str}"]
    if extra_args_val:
        cmd.append(f"EXTRA_ARGS={extra_args_val}")
    
    show_summary(config_str, extra_vars)
    
    try:
        subprocess.run(cmd, check=True)
    except subprocess.CalledProcessError as e:
        print(f"\n❌ Error during execution: {e}")
        exit(e.returncode)
    except KeyboardInterrupt:
        print("\n⚠️  Execution interrupted by user.")
        exit(1)

# ------------------------------------------------------------------------------
# Main Flow
# ------------------------------------------------------------------------------
def get_git_config(key):
    try:
        result = subprocess.run(
            ["git", "config", "--global", key],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=False
        )
        if result.returncode == 0:
            return result.stdout.strip()
    except Exception:
        pass
    return ""

def main():
    # 1. Get user data
    default_name = get_git_config("user.name")
    default_email = get_git_config("user.email")

    if default_name and default_email:
        user_name = default_name
        user_email = default_email
        print("✅ Git is already configured!")
        print(f"   Name:  {user_name}")
        print(f"   Email: {user_email}\n")
    else:
        user_name = inputbox("Identification", "Enter your Full Name (for Git):", default_name)
        if user_name is None:
            print("⚠️  Setup cancelled.")
            sys.exit(0)

        user_email = inputbox("Identification", "Enter your E-mail (for Git):", default_email)
        if user_email is None:
            print("⚠️  Setup cancelled.")
            sys.exit(0)

    # 2. Get available playbooks
    available = get_available_playbooks()
    if not available:
        print("❌ No playbooks found!")
        sys.exit(1)

    # 3. Select main playbooks
    options_list = [(p, f"Install {p} configuration", "OFF") for p in available]
    selected_playbooks = checklist(
        "Genesis Setup - Playbook Selection",
        "Use SPACE to mark/unmark and ENTER to confirm:",
        options_list
    )
    
    if not selected_playbooks:
        print("⚠️  No configuration selected. Exiting.")
        sys.exit(0)

    # 4. Prepare basic variables
    extra_vars = [
        f"git_user_name={shlex.quote(user_name)}",
        f"git_user_email={shlex.quote(user_email)}"
    ]

    # 5. For each selected playbook, check sub-options
    for p in selected_playbooks:
        sub_opts = get_sub_options(p)
        if sub_opts:
            sub_options_list = [(opt, f"Component: {opt}", "OFF") for opt in sub_opts]
            kept = checklist(
                f"Options: {p}",
                f"Select what you want to install for '{p}':",
                sub_options_list
            )

            # Explicitly set variables for all options
            for opt in sub_opts:
                var_name = f"install_{opt.replace('-', '_')}"
                if kept and opt in kept:
                    extra_vars.append(f"{var_name}=true")
                else:
                    extra_vars.append(f"{var_name}=false")

    # 6. Execute
    config_str = f"{COMMON_PLAYBOOK} {' '.join(selected_playbooks)}"
    execute(config_str, extra_vars)

if __name__ == "__main__":
    main()
