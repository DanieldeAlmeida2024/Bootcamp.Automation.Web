describe('Login didático — comportamento no navegador', () => {
  beforeEach(() => cy.visit('http://127.0.0.1:3010'));

  it('aceita conta sintética', () => {
    cy.get('#email').type('aluno@example.test');
    cy.get('#senha').type('senha-sintetica');
    cy.get('button[type=submit]').click();
    cy.get('#status').should('have.attr', 'data-resultado', 'sucesso')
      .and('contain.text', 'Login de demonstração concluído');
  });

  it('recusa credencial incorreta', () => {
    cy.get('#email').type('aluno@example.test');
    cy.get('#senha').type('senha-errada');
    cy.get('button[type=submit]').click();
    cy.get('#status').should('have.attr', 'data-resultado', 'falha')
      .and('contain.text', 'Credenciais inválidas');
  });
});
