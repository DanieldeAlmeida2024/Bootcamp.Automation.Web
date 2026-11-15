const { before, after, test } = require('node:test');
const assert = require('node:assert/strict');
const { criarServidor } = require('../src/servidor-demo.cjs');
const { request } = require('node:http');
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
test('CSP estrita usa script externo permitido, sem JavaScript inline', async () => {
  const resposta = await fetch(url);
  const html = await resposta.text();
  assert.equal(resposta.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(resposta.headers.get('x-frame-options'), 'DENY');
  const csp = resposta.headers.get('content-security-policy');
  assert.match(csp, /script-src 'self'/);
  assert.doesNotMatch(csp, /unsafe-inline/);
  assert.match(html, /<script src="\/login\.js" defer><\/script>/);
  assert.doesNotMatch(html, /<script>.*?<\/script>/s);
  const script = await fetch(url + '/login.js');
  assert.equal(script.status, 200);
  assert.match(script.headers.get('content-type'), /javascript/);
  assert.equal(script.headers.get('cache-control'), 'no-store');
  assert.match(await script.text(), /data.*resultado/);
});

test('arquivos arbitrários não são publicados nem por GET nem por POST', async () => {
  for (const caminho of ('/login.js.map', '/.env', '/fixtures/login.html',
                         '/src/servidor-demo.cjs')) {
    const resposta = await fetch(url + caminho);
    assert.equal(resposta.status, 404, caminho);
  }
  // fetch normaliza segmentos ".." de URL; testar o path codificado
  // diretamente no request HTTP para não transformar a entrada em "/".
  const status = await new Promise((resolve, reject) => {
    const pedido = request({
      hostname: '127.0.0.1', port: servidor.address().port,
      path: '/%2e%2e%2fpackage.json', method: 'GET',
    }, resposta => {
      resposta.resume();
      resposta.on('end', () => resolve(resposta.statusCode));
    });
    pedido.on('error', reject);
    pedido.end();
  });
  assert.equal(status, 404, 'path percent-encoded fora da allowlist');
  const escrita = await fetch(url + '/login.js', { method: 'POST', body: 'x' });
  assert.equal(escrita.status, 404);
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
