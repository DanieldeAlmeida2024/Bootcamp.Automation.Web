const { createServer } = require('node:http');
const { readFile } = require('node:fs/promises');
const { join } = require('node:path');
const pagina = join(__dirname, '..', 'fixtures', 'login.html');

function criarServidor() {
  return createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ status: 'ok' }));
    }
    if (req.method !== 'GET' || req.url !== '/') {
      res.writeHead(404); return res.end('Não encontrado');
    }
    try {
      const html = await readFile(pagina);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
      res.end(html);
    } catch {
      res.writeHead(500); res.end('Fixture indisponível');
    }
  });
}
if (require.main === module) {
  criarServidor().listen(Number(process.env.PORT || 3010), '127.0.0.1', () => {
    console.log('Laboratório web em http://127.0.0.1:' + (process.env.PORT || '3010'));
  });
}
module.exports = { criarServidor };
