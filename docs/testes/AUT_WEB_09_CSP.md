# AUT-WEB-09 — CSP e delimitação de recursos de fixture

**Revisão:** 15/11/2026 · Laboratório Node/Cypress.

## Problema
O HTML de login didático executava um script inline, impedindo usar Content-Security-Policy que recusasse `unsafe-inline`. A rota HTTP servia apenas o HTML; a separação sem um mapeamento estrito de ativos poderia, se implementada de forma genérica, introduzir path traversal.

## Contrato
- Mover JavaScript didático para `fixtures/login.js` e carregar com `defer`.
- Servir somente as rotas fixas `GET /`, `GET /login.js`, `GET /health`; rejeitar método POST e outros caminhos.
- Definir `default-src 'none'; script-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`, além de `nosniff`, `no-store`, `X-Frame-Options: DENY` e referrer policy restritiva.
- Testes HTTP garantem que CSP e o asset JavaScript são entregues, que o HTML não possui inline e que arquivos internos não são servidos.
- Cypress Electron continua testando sucesso e erro com credenciais sintéticas.

## Limitações
Não é login real, banco de usuários, serviço público ou teste de proteção contra todas as ameaças de navegador. Não publicar a aplicação em rede externa.
