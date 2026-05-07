import os

PLAYBOOKS_DIR = "playbooks"
COMMON_PLAYBOOK = "common"

def get_available():
    """Lê a pasta de playbooks e retorna uma lista de nomes (exceto o common)."""
    if not os.path.exists(PLAYBOOKS_DIR):
        return []
    
    playbooks = []
    for f in os.listdir(PLAYBOOKS_DIR):
        if f.endswith(".yml") and f != f"{COMMON_PLAYBOOK}.yml":
            playbooks.append(f.replace(".yml", ""))
    return sorted(playbooks)

def get_sub_options(playbook_name):
    """Lê o arquivo do playbook em busca da linha @sub-options."""
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
