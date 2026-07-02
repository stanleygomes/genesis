import os
import re

CLAUDE_DIR = os.path.expanduser("~/.claude")
CLAUDE_MD_PATH = os.path.join(CLAUDE_DIR, "CLAUDE.md")
RULES_BLOCK_START = "<!-- BEGIN PROVERBS RULES (auto-synced from ~/.agents/rules, do not edit by hand) -->"
RULES_BLOCK_END = "<!-- END PROVERBS RULES -->"

def sync_skills(agents_dir):
    """Mirror ~/.agents/skills into ~/.claude/skills via a symlink."""
    skills_source = os.path.join(agents_dir, "skills")
    skills_target = os.path.join(CLAUDE_DIR, "skills")

    if not os.path.isdir(skills_source):
        print(f"ℹ️ No skills folder found in {agents_dir}, skipping skills sync.")
        return

    os.makedirs(CLAUDE_DIR, exist_ok=True)

    if os.path.islink(skills_target):
        if os.readlink(skills_target) == skills_source:
            print("✅ ~/.claude/skills already mirrors ~/.agents/skills.")
            return
        os.remove(skills_target)
    elif os.path.exists(skills_target):
        print(f"⚠️ {skills_target} already exists and is not a symlink. Skipping skills sync to avoid overwriting it.")
        return

    os.symlink(skills_source, skills_target, target_is_directory=True)
    print(f"🔗 Linked {skills_target} -> {skills_source}")

def sync_rules(agents_dir):
    """Merge the contents of ~/.agents/rules/*.md into ~/.claude/CLAUDE.md."""
    rules_dir = os.path.join(agents_dir, "rules")
    if not os.path.isdir(rules_dir):
        print(f"ℹ️ No rules folder found in {agents_dir}, skipping rules sync.")
        return

    rule_files = sorted(f for f in os.listdir(rules_dir) if f.endswith(".md"))
    if not rule_files:
        print("ℹ️ No rule files found, skipping rules sync.")
        return

    sections = []
    for filename in rule_files:
        with open(os.path.join(rules_dir, filename), "r") as f:
            sections.append(f"### {filename}\n\n{f.read().strip()}")
    block = f"{RULES_BLOCK_START}\n\n" + "\n\n".join(sections) + f"\n\n{RULES_BLOCK_END}"

    os.makedirs(CLAUDE_DIR, exist_ok=True)
    existing = ""
    if os.path.exists(CLAUDE_MD_PATH):
        with open(CLAUDE_MD_PATH, "r") as f:
            existing = f.read()

    pattern = re.compile(
        re.escape(RULES_BLOCK_START) + r".*?" + re.escape(RULES_BLOCK_END),
        re.DOTALL
    )
    if pattern.search(existing):
        updated = pattern.sub(block, existing)
    elif existing.strip():
        updated = existing.rstrip() + "\n\n" + block + "\n"
    else:
        updated = block + "\n"

    with open(CLAUDE_MD_PATH, "w") as f:
        f.write(updated)
    print(f"📝 Synced {len(rule_files)} rule file(s) into {CLAUDE_MD_PATH}")

def sync_from_agents(agents_dir):
    sync_skills(agents_dir)
    sync_rules(agents_dir)
