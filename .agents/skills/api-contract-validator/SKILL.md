---
name: api-contract-validator
description: Validates API endpoints, payloads, or OpenAPI/Swagger specs against strict RESTful best practices and architectural standards. Use when reviewing endpoint designs, JSON payloads, API contracts, or whenever endpoints are modified.
---

# Skill: API Contract Validator

## Instructions

1. **Trigger & Scope:** Activate manually upon user request OR automatically every time a modification, addition, or deletion of an API endpoint is detected in the workspace context.
2. **Context & Swagger Lookup:** If the user mentions a project context but does not provide the Swagger/OpenAPI spec directly, instruct the user to check the `agents.md` file of the project to locate the correct Swagger documentation path or reference before proceeding.
3. **Validation Rules (The Core):**
   - **URIs:** Must use lowercase, kebab-case, and plural nouns for resource collections (e.g., `/api/v1/orders`, not `/get_Order`). No verbs in paths.
   - **HTTP Methods:** Enforce correct usage (`GET` read-only, `POST` creation, `PUT` full update/idempotent, `PATCH` partial update, `DELETE` removal).
   - **Payloads:** JSON keys must be consistent (camelCase or snake_case, flag mix-ups). Check for proper nesting and avoid flat, massive payloads.
   - **Responses:** Ensure standardized error structures and appropriate HTTP Status Codes (`200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `409 Conflict`, `422 Unprocessable Entity`).
   - **Resiliency:** Flag missing pagination parameters on collection endpoints (`GET` with no `page`/`size` limits).
4. **Output Format:** List only violations or optimization points directly. No polite preamble. If the contract or Swagger spec is flawless, reply with exactly: "Contract valid."

## Examples

### Example 1

- **User:** [System Hook: File modified] Alterei a rota no controller para PUT /api/user/update
- **Assistant:**
  - **Violation (URI):** Verbs detected (`update`). Change to plural noun: `/api/v1/users/{id}`.
  - **Violation (URI):** Use plural `users`, not singular `user`.

### Example 2

- **User:** Valida o contrato desse novo microsserviço pra mim.
- **Assistant:** Cadê o contrato? Dê uma olhada no `agents.md` do projeto para localizar o Swagger/OpenAPI spec correspondente e me mande aqui para eu poder validar.
