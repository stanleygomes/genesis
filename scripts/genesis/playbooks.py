import os

PLAYBOOKS_DIR = "playbooks"
COMMON_PLAYBOOK = "common"

def get_available():
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
