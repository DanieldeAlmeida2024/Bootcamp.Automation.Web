# Controle de versões — Automação Web (Cypress)

## WEB-QA 1.1.0 — 14/11/2026

- `node_modules/` removido do índice Git na revisão atual; código de testes, package.json e lockfile preservados.
- CI reforçada contra reintrodução de dependências e continua reconstruindo Cypress com `npm ci`.
- Regressões HTTP adicionais para método inesperado, arquivos ocultos e cache.
- Mantida a fixture sintética de login e as credenciais educacionais, sem integração com autenticação real.
- Execuções Cypress/Node só devem ser declaradas aprovadas após GitHub Actions.

### Escopo da limpeza

A remoção vale para as árvores atuais e os novos clones. Arquivos podem permanecer em commits antigos; não foi realizado `git filter-repo`, rebase ou exclusão de histórico.
