const { createServer } = require('node:http');
const { readFile } = require('node:fs/promises');
const { join } = require('node:path');
const pagina = join(__dirname, '..', 'fixtures', 'login.html');
const scriptLogin = join(__dirname, '..', 'fixtures', 'login.js');
const headersSeguros = Object.freeze({
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
  'Content-Security-Policy':
    "default-src 'none'; script-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
});

function criarServidor() {
  return createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/health') {
      res.writeHead(200, { ...headersSeguros, 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ status: 'ok' }));
    }
    // O laboratório serve exclusivamente dois arquivos estáticos conhecidos.
    // Não aceitar caminho de arquivo vindo de URL ou path traversal.
    if (req.method !== 'GET' || (req.url !== '/' && req.url !== '/login.js')) {
      res.writeHead(404, headersSeguros); return res.end('Não encontrado');
    }
    try {
      const isScript = req.url === '/login.js';
      const body = await readFile(isScript ? scriptLogin : pagina);
      res.writeHead(200, {
        ...headersSeguros,
        'Content-Type': isScript
          ? 'text/javascript; charset=utf-8'
          : 'text/html; charset=utf-8',
      });
      return res.end(body);
    } catch {
      res.writeHead(500, headersSeguros); return res.end('Fixture indisponível');
    }
  });
}
if (require.main === module) {
  criarServidor().listen(Number(process.env.PORT || 3010), '127.0.0.1', () => {
    console.log('Laboratório web em http://127.0.0.1:' + (process.env.PORT || '3010'));
  });
}
module.exports = { criarServidor };
