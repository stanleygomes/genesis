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
