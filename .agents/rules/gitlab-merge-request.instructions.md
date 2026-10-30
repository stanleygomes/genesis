---
description: Defines the GitLab merge request description format in Portuguese.
applyTo: '*'
---

## GitLab merge requests

For GitLab merge requests, this format takes precedence over the general MR description template. Write the title and description in Portuguese and do not include references to code authorship. Use the following structure, filling it with facts supported by the changes and validation. Do not claim tests were run when they were not. Replace `Closes #` with an issue reference when applicable.

```markdown
## 📌 O que muda

<Resumo objetivo do comportamento alterado.>

## 🎯 Por quê

<Motivação e referência à issue, quando aplicável.>

Closes #<número>

## 🧪 Como testar

1. <Passo reproduzível.>

**Evidência:** <Resultado dos testes ou estado da validação.>

## 🔄 Tipo de mudança

- [ ] `feat` — nova funcionalidade
- [ ] `fix` — correção de bug
- [ ] `refactor` — refatoração sem mudança de comportamento
- [ ] `perf` — melhoria de performance
- [ ] `chore` / `ci` / `build` — infraestrutura, dependências, pipeline
- [ ] `docs` — documentação
- [ ] `test` — testes
- [ ] ⚠️ **Breaking change** — exige ação de quem consome

## ✅ Checklist

- [ ] Testes unitários adicionados/atualizados (happy path + cenários de erro)
- [ ] Contrato de API/Swagger atualizado (se aplicável)
- [ ] Sem segredos, tokens ou dados sensíveis no diff
- [ ] Variáveis de ambiente criadas no CI/CD (se aplicável)
- [ ] Migração/rollback avaliados (se aplicável)
- [ ] Documentação atualizada (AGENTS.md / README, se aplicável)

## ⚠️ Breaking change / impacto operacional

<O que quebra, ação necessária e rollback. Remova esta seção se não houver.>

## 📎 Contexto adicional

<Decisões, trade-offs e dependências relevantes. Remova esta seção se não houver.>

---

/assign me
/draft
```
