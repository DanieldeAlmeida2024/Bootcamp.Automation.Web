const { before, after, test } = require('node:test');
const assert = require('node:assert/strict');
const { criarServidor } = require('../src/servidor-demo.cjs');
let servidor, url;
before(async () => {
  servidor = criarServidor();
  await new Promise(resolve => servidor.listen(0, '127.0.0.1', resolve));
  url = 'http://127.0.0.1:' + servidor.address().port;
});
after(async () => {
  await new Promise((resolve, reject) => servidor.close(erro => erro ? reject(erro) : resolve()));
});
test('serve HTML de demonstração', async () => {
  const resposta = await fetch(url);
  assert.equal(resposta.status, 200);
  const html = await resposta.text();
  assert.match(html, /id="login"/);
  assert.match(html, /id="email"/);
  assert.match(html, /id="status"/);
});
test('health retorna 200', async () => {
  assert.equal((await fetch(url + '/health')).status, 200);
});
test('não serve caminhos desconhecidos', async () => {
  assert.equal((await fetch(url + '/outro')).status, 404);
});


test('somente GET / e GET /health são permitidos', async () => {
  const resposta = await fetch(url, { method: 'POST', body: 'login=teste' });
  assert.equal(resposta.status, 404);
  const arquivo = await fetch(url + '/.env');
  assert.equal(arquivo.status, 404);
});
test('HTML não deve ser armazenado em cache compartilhado', async () => {
  const resposta = await fetch(url);
  assert.equal(resposta.headers.get('cache-control'), 'no-store');
});
