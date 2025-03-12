/// <reference types="cypress" />
// funcionalidade 
describe("Login", ()=> {
    beforeEach(() => {
        cy.viewport('iphone-6');
    })
//cenarios  
    it("Login com sucesso", () => {
        // DADO
        // abrir a aplicação
        cy.visit('https://automationpratice.com.br/login');
        // preenche e-mail e senha 
        cy.get('#user').type('edu@qazando.com');
        cy.get('#password').type('123456');
        // QUANDO 
        // clica em entrar
        cy.get('#btnLogin').click();
        

        //ENTÃO
        // valida a mensagem
        cy.get('#swal2-title').should('be.visible');
        cy.get('#swal2-title').should('have.text','Login realizado');
    });

    it("E-mail invalido", () => {
        cy.visit("https://automationpratice.com.br/login");
        cy.get('#user').type('shuahwuhauhwhu');
        cy.get('#password').type('123456');
        cy.get('#btnLogin').click();

        cy.get('.invalid_input').should('have.text', 'E-mail inválido.')
    });

    it("Senha invalida", () => {
        cy.visit("https://automationpratice.com.br/login");
        cy.get('#user').type('edu@qazando.com');
        cy.get('#password').type('123');
        cy.get('#btnLogin').click();

        cy.get('.invalid_input').should('have.text', 'Senha inválida.')
    });


    it("Senha vazia", () => {
        cy.visit("https://automationpratice.com.br/login");
        cy.get('#user').type('edu@qazando.com');
        cy.get('#btnLogin').click();

        cy.get('.invalid_input').should('have.text', 'Senha inválida.')
    });

    it("E-mail vazio", () => {
        cy.visit("https://automationpratice.com.br/login");
        cy.get('#password').type('123456');
        cy.get('#btnLogin').click();

        cy.get('.invalid_input').should('have.text', 'E-mail inválido.')
    });

    it("E-mail e senha vazios", () => {
        cy.visit("https://automationpratice.com.br/login");
        cy.get('#btnLogin').click();

        cy.get('.invalid_input').should('have.text', 'E-mail inválido.')
    });

});
