# Plano de testes — Bootcamp.Automation.Web

## Casos
1. Entrada válida: deve produzir o resultado documentado.
2. Entrada inválida: deve gerar mensagem clara e não produzir sucesso falso.
3. Dependência indisponível: comportamento deve ser identificado.
4. Documentação: arquivos mínimos e PlantUML legíveis.

## Comandos
```bash
npm install
npx cypress open
python -m unittest discover -s tests -p "test_documentacao.py" -v
```

**Atenção:** o teste Python adicionado apenas confere a estrutura documental. Não valida navegador, APIs ou serviços reais.

## WEB-QA-2026-11-14 — higiene de repositório e regressão do servidor

| ID | Contrato | Automação |
| --- | --- | --- |
| WEB-C01 | `node_modules/` ausente do índice Git | `git ls-files -- node_modules` no Actions |
| WEB-C02 | Dependências restauradas por lockfile | `npm ci` no Actions |
| WEB-T04 | `POST /` retorna HTTP 404 | `tests/servidor-demo.test.cjs` |
| WEB-T05 | `GET /.env` retorna HTTP 404 | `tests/servidor-demo.test.cjs` |
| WEB-T06 | HTML contém `Cache-Control: no-store` | `tests/servidor-demo.test.cjs` |
| WEB-E01 | Login sintético positivo e negativo no navegador | `cypress/e2e/login-local.cy.js` |

O CI faz testes Node.js e Cypress Electron reais sobre a fixture HTTP local. Não há usuário ou sistema de autenticação produtivo; as credenciais usadas são exclusivamente de demonstração.
