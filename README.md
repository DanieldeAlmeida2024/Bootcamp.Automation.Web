# Testes automatizados Web — Cypress

Laboratório de automação de interface web com Cypress, Node.js e JavaScript. Os cenários exercitam um formulário sintético de login, com estados de sucesso, erro e validação de campos.

## Preparação

```bash
npm ci
npm test
```

Para executar os testes em navegador:

```bash
npm run demo:web
```

Em outro terminal:

```bash
npm run test:cypress
```

O servidor de demonstração é disponibilizado localmente em `127.0.0.1:3010`. Para explorar os testes com a interface Cypress, utilize `npx cypress open`.

## Cobertura

- Verificação da resposta do servidor de demonstração.
- Fluxos do formulário em navegador com Cypress.
- Cenários positivos e negativos usando credenciais de exemplo.

O formulário autentica dados **sintéticos**, exclusivamente para estudo de automação. Ele não representa autenticação segura em uma aplicação de produção. O workflow de GitHub Actions executa os testes do laboratório.

## Documentação

[Requisitos](docs/REQUISITOS.md) · [Arquitetura](docs/ARQUITETURA.md) · [UML](docs/UML.puml) · [Plano de testes](docs/PLANO_TESTES.md) · [Guia de manutenção](AGENTS.md).

## Reprodutibilidade do laboratório

O repositório rastreia **somente o código-fonte, as fixtures, a documentação e os manifests do npm**. Não contém `node_modules` na revisão atual: as dependências Cypress são reconstruídas por `npm ci` a partir do `package-lock.json` no CI e no desenvolvimento local.

O workflow aborta se algum arquivo de `node_modules/` voltar ao índice Git. Os testes adicionais conferem que o servidor de demonstração não responde em rotas inesperadas, não aceita `POST /` e não mantém o HTML em cache. A limpeza não remove arquivos de commits antigos; uma remoção de todo o histórico exigiria operação separada.
