# Plano de testes — Bootcamp.Automation.Web

**v1.0.0**, 11/11/2026. `main` auditada @ `e14af42cdb218aa8b1466d81d707439f9f0f562b`; casos não executados aqui.

## Matriz rastreável
| ID | Arquivo/cenário | Expectativa | Situação |
|---|---|---|---|
| QA-01 | `cypress/e2e/login.cy.js — sucesso` | Login com credenciais de demonstração em ambiente autorizado. | Requer execução |
| QA-02 | `cypress/e2e/login.cy.js — email inválido` | Rejeitar sem login. | Requer execução |
| QA-03 | `cypress/e2e/login.cy.js — senha inválida` | Rejeitar no formulário. | Requer execução |
| QA-04 | `cypress/e2e/login.cy.js — campos vazios` | Mensagens de validação previstas no teste. | Requer execução |
| QA-05 | `cypress.config.js` | Revisar seletor após mudanças do site de terceiros. | Requer execução |

## Riscos e regressão
- QA-N01: indisponibilidade de site/aplicativo; distinguir falha de infraestrutura de defeito de produto.
- QA-N02: selectors/elementos alterados; salvar vídeo/screenshot e identificar plataforma.
- QA-N03: limpar estado de sessão antes de cada repetição, não modificar contas reais.
- QA-N04: repetir em versão atualizada da ferramenta e comparar resultados.

## Execução e evidências
```bash
npx cypress run --spec cypress/e2e/login.cy.js
```

Salvar logs, capturas, tempo, versão de navegador/emulador, commit, resultado e taxa de intermitência. Testes de documentação Python existentes não são testes E2E reais.
