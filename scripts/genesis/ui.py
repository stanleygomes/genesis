import subprocess
import re

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
