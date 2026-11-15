// Comportamento local da fixture Cypress: não há requisição nem login real.
document.getElementById('login').addEventListener('submit', (evento) => {
  evento.preventDefault();
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const sucesso = email === 'aluno@example.test' && senha === 'senha-sintetica';
  const status = document.getElementById('status');
  status.dataset.resultado = sucesso ? 'sucesso' : 'falha';
  status.textContent = sucesso ? 'Login de demonstração concluído' : 'Credenciais inválidas';
});
