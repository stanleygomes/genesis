import sys
import shlex
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
