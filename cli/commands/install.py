import sys
import shlex
import os
import subprocess
from cli.helpers import git, playbook, prompt
from cli.core import runner

def execute():
    # 1. Get user data
    user_name, user_email = git.get_git_user()
    if not user_name or not user_email:
        user_name = prompt.ask_text("Enter your Full Name (for Git):", default=user_name or "")
        user_email = prompt.ask_text("Enter your E-mail (for Git):", default=user_email or "")
        if not user_name or not user_email:
            print("⚠️ Setup cancelled.")
            sys.exit(0)
    else:
        print("✅ Git is already configured!")
        print(f"   Name:  {user_name}")
        print(f"   Email: {user_email}\n")

    # 1.5. Proverbs configuration (AI harness Workspace - Skills, Agents, rules and more)
    configure_proverbs = prompt.ask_confirm(
        "Do you want to configure proverbs (AI harness Workspace - Skills, Agents, rules and more)?",
        default=False
    )
    if configure_proverbs:
        agents_dir = os.path.expanduser("~/.agents")
        if os.path.exists(agents_dir):
            if prompt.ask_confirm(f"The folder {agents_dir} already exists. Do you want to update it?", default=True):
                print(f"🔄 Updating proverbs repository in {agents_dir}...")
                try:
                    subprocess.run(
                        ["git", "-C", agents_dir, "pull"],
                        check=True
                    )
                    print("✅ proverbs updated successfully!\n")
                except subprocess.CalledProcessError as e:
                    print(f"❌ Failed to update proverbs repository: {e}")
                    sys.exit(1)
            else:
                print("⚠️ Setup cancelled.")
                sys.exit(0)
        else:
            print(f"📥 Cloning proverbs repository into {agents_dir}...")
            try:
                subprocess.run(
                    ["git", "clone", "https://github.com/stanleygomes/proverbs.git", agents_dir],
                    check=True
                )
                print("✅ proverbs configured successfully!\n")
            except subprocess.CalledProcessError as e:
                print(f"❌ Failed to clone proverbs repository: {e}")
                sys.exit(1)

    # 2. Get available playbooks
    available = playbook.get_available_playbooks()
    if not available:
        print("❌ No playbooks found!")
        sys.exit(1)

    # 3. Select main playbooks using InquirerPy
    selected_playbooks = prompt.ask_checkbox(
        "Select the playbooks you want to install/update:",
        available
    )

    if not selected_playbooks:
        if prompt.ask_confirm("No playbook selected. Proceed with only the common configuration?"):
            selected_playbooks = []
        else:
            print("⚠️ Setup cancelled.")
            sys.exit(0)

    # 4. Prepare extra variables
    extra_vars = [
        f"git_user_name={shlex.quote(user_name)}",
        f"git_user_email={shlex.quote(user_email)}"
    ]

    # 5. Execute
    config_str = f"common {' '.join(selected_playbooks)}"
    runner.execute(config_str, extra_vars)
