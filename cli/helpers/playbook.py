import os

PLAYBOOKS_DIR = "ansible/playbooks"
COMMON_PLAYBOOK = "common"

def get_available_playbooks():
    """Reads the playbooks directory and returns a list of names (except common)."""
    if not os.path.exists(PLAYBOOKS_DIR):
        return []
    
    playbooks = []
    for f in os.listdir(PLAYBOOKS_DIR):
        if f.endswith(".yml") and f != f"{COMMON_PLAYBOOK}.yml":
            playbooks.append(f.replace(".yml", ""))
    return sorted(playbooks)
