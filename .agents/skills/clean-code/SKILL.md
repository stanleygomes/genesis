---
name: clean-code-enforcer
description: Refactors coupled or bloated code, splitting responsibilities into correct layers and enforcing clean code standards for variables, functions, and classes. Use when code contains mixed responsibilities or poor readability.
---

# Skill: Clean Code Enforcer

## Instructions

1. **Scope:** Inspect code for architectural smell, violations of SRP (Single Responsibility Principle), tight coupling, and poor readability.
2. **Architectural Rules (The Clean Cut):**
   - **Persistence:** Ban Services/Use Cases from querying models directly. Extract to a **Repository**.
   - **I/O & Side Effects:** Ban file I/O, raw network calls, or crypto from business logic. Extract to **Helpers/Utils**.
3. **Code Quality Rules (Clean Code Basics):**
   - **Variables:** Enforce highly descriptive, searchable names. Ban generic shortcuts (e.g., `u`, `data`, `info`) and magic numbers/strings (extract to constants/enums).
   - **Functions:** Must be small, do exactly **one thing**, and have a maximum of 3 arguments. Favor early returns to eliminate deep `if/else` nesting.
   - **Classes:** Keep them cohesive and focused. If a class has too many fields or methods that don't interact with each other, split it.
4. **Output Requirement:** Output _only_ the refactored, clean code blocks separated by layer/file, followed by a brief, dry list of what was extracted or fixed. No polite fluff.
