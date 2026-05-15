#!/usr/bin/env python3
import sys
import os

# Add the current directory to the path to find the genesis package
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from genesis import ui, playbooks, runner

def main():
    # 1. Get user data
    user_name = ui.inputbox("Identification", "Enter your Full Name (for Git):", "")
    user_email = ui.inputbox("Identification", "Enter your E-mail (for Git):", "")
    
    if user_name is None or user_email is None:
        print("⚠️  Setup cancelled.")
        sys.exit(0)

    # 2. Get available playbooks
    available = playbooks.get_available()
    if not available:
        print("❌ No playbooks found!")
        sys.exit(1)

    # 3. Select main playbooks
    options_list = [(p, f"Install {p} configuration", "OFF") for p in available]
    selected_playbooks = ui.checklist(
        "Genesis Setup - Playbook Selection",
        "Use SPACE to mark/unmark and ENTER to confirm:",
        options_list
    )
    
    if not selected_playbooks:
        print("⚠️  No configuration selected. Exiting.")
        sys.exit(0)

    # 4. Prepare basic variables
    import shlex
    extra_vars = [
        f"git_user_name={shlex.quote(user_name)}",
        f"git_user_email={shlex.quote(user_email)}"
    ]

    # 5. For each selected playbook, check sub-options
    for p in selected_playbooks:
        sub_opts = playbooks.get_sub_options(p)
        if sub_opts:
            sub_options_list = [(opt, f"Component: {opt}", "OFF") for opt in sub_opts]
            kept = ui.checklist(
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
    config_str = f"{playbooks.COMMON_PLAYBOOK} {' '.join(selected_playbooks)}"
    runner.execute(config_str, extra_vars)

if __name__ == "__main__":
    main()
