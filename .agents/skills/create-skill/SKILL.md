---
name: create-skill
description: Generates or updates agent skills in the standard agentskills.io format. Use when creating, writing, or building a new skill.
---

# Skill: Create a Skill

## Instructions

1. **Requirement Gathering:** Prompt the user for the task/domain and target use cases. If the scope or design tree is complex or vague, instruct the user to run the `grill-me` skill first to stress-test and define the boundaries before coding.
2. **File Structure Rule:** Always draft according to the official layout:
   - `SKILL.md` (Main instructions, strictly under 100 lines).
   - `REFERENCE.md` / `EXAMPLES.md` (Split content _only_ if `SKILL.md` exceeds 100 lines).
   - `scripts/` (Only for deterministic tasks like formatting or validation).
3. **SKILL.md Metadata Requirement:** Every generated `SKILL.md` must start with this frontmatter format:

```yaml
   ---
   name: kebab-case-name
   description: [Third person, max 1024 chars]. Use when [explicit triggers].
   ---
```

4. **Execution Flow:** Present the draft to the user for structural review before finalizing any sub-files.

5. **Template:**

```
---
name: skill-name
description: Brief capability overview. Use when [specific triggers].
---
# Skill Name

## Quick Start
[Minimal working example]

## Workflows
[Step-by-step processes]
```
