# Teste de login responsivo com Cypress

**v1.0.0**, 11/11/2026. `main` auditada @ `e14af42cdb218aa8b1466d81d707439f9f0f562b`; casos não executados aqui.

## Missão e abordagem
Cypress JavaScript E2E com viewport iphone-6 e site externo https://automationpratice.com.br/login.

## Arquivos de teste e comportamento real
| Arquivo/cenário | Ação/contrato | Verificação técnica |
|---|---|---|
| `cypress/e2e/login.cy.js — sucesso` | Preenche #user e #password e verifica #swal2-title = Login realizado. | Login com credenciais de demonstração em ambiente autorizado. |
| `cypress/e2e/login.cy.js — email inválido` | E-mail sem formato e senha de teste; espera .invalid_input = E-mail inválido. | Rejeitar sem login. |
| `cypress/e2e/login.cy.js — senha inválida` | Senha curta e e-mail válido; espera Senha inválida. | Rejeitar no formulário. |
| `cypress/e2e/login.cy.js — campos vazios` | Testa senha vazia, e-mail vazio e ambos ausentes. | Mensagens de validação previstas no teste. |
| `cypress.config.js` | setupNodeEvents vazio, execução E2E com selectors CSS fixos. | Revisar seletor após mudanças do site de terceiros. |

## Fluxo de execução
```bash
npx cypress run --spec cypress/e2e/login.cy.js
```

## Riscos, isolamento e limitações
Site externo de demonstração pode mudar de layout, selectors, credenciais e disponibilidade. A suíte contém credenciais públicas de demonstração, não credenciais pessoais. Os testes não verificam backend, tokens ou política de autenticação real.

Os arquivos são scripts de automação, não uma aplicação de negócio. Os critérios precisam identificar versão da ferramenta, URL/appId e resultado observável; não inventar banco ou backend interno.
