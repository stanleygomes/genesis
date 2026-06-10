import subprocess

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

def get_git_user():
    return get_git_config("user.name"), get_git_config("user.email")

def pull_updates():
    try:
        print("🔄 Checking for repository updates...")
        res = subprocess.run(
            ["git", "rev-parse", "--is-inside-work-tree"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=False
        )
        if res.returncode == 0 and res.stdout.strip() == "true":
            print("📥 Pulling latest changes from Git...")
            subprocess.run(["git", "pull"], check=False)
        else:
            print("ℹ️ Not a git repository, skipping auto-update.")
    except Exception as e:
        print(f"⚠️ Failed to pull changes: {e}")
