# Bootcamp.Automation.Web

Automação de cenários web, incluindo autenticação, com Cypress. **Material didático**, não é produto de produção.

## Requisitos e execução

Tecnologias: JavaScript, Node.js e Cypress.

```bash
npm install
npx cypress open
```

A pasta `fixtures/` contém uma página de login **sintética** com e-mail/senha fictícios. `npm test` verifica o servidor HTTP local e `npm run test:cypress` exercita no navegador estados de sucesso e erro. O CI executa ambos; esse material **não equivale a autenticação real em produção**.

## Documentação

- [Requisitos](docs/REQUISITOS.md)
- [Arquitetura](docs/ARQUITETURA.md)
- [UML](docs/UML.puml)
- [Plano de testes](docs/PLANO_TESTES.md)
- [Instruções para assistentes](AGENTS.md)

## Registro da documentação original

## Automação de testes WEB com Cypress
- Neste projeto é feito a automação de teste de qualidade de uma página web de login, para fins didáticos

#### Requisitos
- NodeJs
- Visual Studio Code ou IDE de preferencia, compativel com javascript/Node
- Terminal / CMD

### Execução
  - Abrir pasta do projeto no terminal e dentro executar o comando "npx cypress open"
  - Será exibido uma tela de abertura do cypress com o dashboard de testes.

## Executar a demonstração local

```bash
npm ci
npm test
npm run demo:web         # terminal 1 (127.0.0.1:3010)
npm run test:cypress     # terminal 2
```

O formulário é um simulador proposital para laboratório; a validação de credenciais ocorre no browser, portanto **não serve como modelo de segurança para projetos reais**. Para testar um site real, configure cenários Cypress separados e controle seletores e dados de homologação.
