---
name: security-scan
description: Audits code, pull requests, and architecture for common security vulnerabilities, including injection attacks, broken access control, and unauthorized privilege escalation. Use when performing security reviews, code audits, or scanning for application security flaws.
---

# Skill: Security Scan

## Instructions

1. **Trigger & Scope:** Activate on explicit user request (e.g., "scan de segurança", "security audit", "revisão de segurança") or when inspecting code changes, pull requests, API endpoints, or database queries for vulnerabilities.
2. **Review Strategy:** Scan input entry points, data flows, persistence queries, and authorization boundaries against the vulnerability groups below.
3. **Core Validation Rules (by Group):**

   ### Grupo 1 — Injeção & Sanitização
   - **SQL Injection:** Ban string concatenation, string formatting, or interpolation in SQL queries. Enforce prepared statements, parameterized queries, or safe ORM abstractions. Validate dynamic order/column names against explicit allowlists.
   - **XSS (Cross-Site Scripting):** Proibir renderização de dados de usuário sem escape em templates e DOM. Ban APIs inseguras (`innerHTML`, `dangerouslySetInnerHTML`, `v-html`) sem sanitização rigorosa. Garantir Content Security Policy (CSP) e context-aware encoding.
   - **Command Injection:** Proibir passagem direta de inputs não sanitizados para executores de sistema/shell (`exec`, `system`, `eval`, `child_process.exec`).

   ### Grupo 2 — Controle de Acesso & Autorização
   - **Acesso Não Autorizado a Recursos (IDOR / BOLA):** Garantir que requisições a recursos (`/items/{id}`) validem explicitamente no backend o vínculo entre o recurso e o usuário autenticado (`user.id` da sessão/token), nunca confiando cegamente no identificador fornecido pelo cliente.
   - **Mudança de Role / Permissão Não Autorizada:** Proibir mass assignment em campos privilegiados (`role`, `is_admin`, `permissions`, `groups`). Exigir verificação estrita de permissões do usuário logado antes de alterar papéis ou privilégios.
   - **Broken Function Level Authorization:** Garantir guards/middlewares de autenticação e RBAC/ABAC em todas as rotas e métodos sensíveis ou administrativos.

   ### Grupo 3 — Autenticação & Gerenciamento de Sessão
   - **Exposição de Credenciais:** Proibir hardcoded secrets, API keys, senhas, chaves privadas ou tokens no código-fonte e em arquivos versionados.
   - **Sessão & Tokens:** Exigir flags seguras para cookies de sessão (`HttpOnly`, `Secure`, `SameSite`), expiração adequada e invalidação de tokens no logout.

   ### Grupo 4 — Exposição de Dados Sensíveis
   - **Vazamento em Logs & Respostas:** Proibir o envio ou registro de dados sensíveis (senhas, hashes, dados de cartão, PII, stack traces internos) em payloads de resposta e logs de aplicação.
   - **Tratamento Seguro de Erros:** Mascarar mensagens de erro internas em ambientes de produção, evitando expor detalhes de banco de dados, versões ou infraestrutura.

4. **Output Format:**
   List detected issues grouped by category with severity, location, impact, and actionable remediation:

   ```
   ## Security Scan Findings

   ### [Grupo / Categoria]
   - **Severidade:** CRITICAL | HIGH | MEDIUM | LOW
   - **Localização:** `caminho/do/arquivo:linha`
   - **Vulnerabilidade:** [Descrição concisa da falha]
   - **Risco:** [Impacto potencial em caso de exploração]
   - **Correção:** [Código ou orientação precisa para mitigar]
   ```

   Se nenhuma vulnerabilidade for encontrada, responda objetivamente: "Nenhuma vulnerabilidade identificada."
