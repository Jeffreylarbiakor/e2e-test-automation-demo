describe('Login', () => {
  // saucedemo rate-limits repeated page loads from CI IPs, so both scenarios
  // are covered in one visit: invalid login first (stays on page), then valid.
  it('shows error on wrong credentials then succeeds with valid credentials', () => {
    cy.visit('/');

    // Invalid login — page stays on login, error appears
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('wrong_password');
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Username and password do not match');

    // Valid login — clear fields and log in correctly
    cy.get('[data-test="username"]').clear().type('standard_user');
    cy.get('[data-test="password"]').clear().type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');
  });
});
