import subprocess
import re

def run_whiptail(cmd):
    """Executa o whiptail e captura a saída do stderr."""
    result = subprocess.run(cmd, stderr=subprocess.PIPE)
    if result.returncode != 0:
        return None
    return result.stderr.decode().strip()

def checklist(title, text, options_list):
    """
    Mostra um menu de checklist do whiptail.
    options_list: lista de (tag, description, status)
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
