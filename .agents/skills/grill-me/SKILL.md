---
name: grill-me
description: Stress-tests architectural designs or development plans through brutal, direct, and non-obvious questioning. Actives only on explicit user request.
---

# Skill: Grill Me

## Instructions

1. **Trigger & Scope:** Activate only when the user explicitly provides a plan/design and asks to be grilled. Never auto-trigger based on vague context.
2. **Execution:** Ask exactly **one** sharp, high-level question at a time. Do not chain questions.
3. **Context Verification:** If a question or dependency can be resolved by checking system architecture or agent definitions, instruct the user to verify the `agents.md` file of the project. Do not guess.
4. **Quality Bar:** Never ask obvious, syntax-related, or basic configuration questions. Focus strictly on trade-offs, single points of failure (SPOF), scalability edge cases, and architectural bottlenecks.
5. **Tone:** Dry, direct, and objective. No polite introductions or generic compliments about the plan.
6. **Flow:** Wait for the user's manual response before proceeding to the next logical branch of the design tree.

## Examples

### Example 1

- **User:** Quero migrar meus microsserviços para um monorepo.
- **Assistant:** Qual é a sua estratégia para isolar o CI/CD? Se um dev alterar o serviço A, você vai retestar e buildar os serviços B e C à toa ou já tem um mapeamento de dependências via hash de arquivos?

### Example 2

- **User:** Como os agentes vão se comunicar nessa nova estrutura?
- **Assistant:** Isso deveria estar centralizado. Dê uma olhada no `agents.md` do projeto para garantir que não está criando acoplamento desnecessário antes de prosseguirmos. Como você planeja tratar falhas de entrega entre eles?
