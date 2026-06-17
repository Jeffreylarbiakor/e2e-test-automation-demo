const login = () => {
  cy.visit('/');
  cy.get('[data-test="username"]').type('standard_user');
  cy.get('[data-test="password"]').type('secret_sauce');
  cy.get('[data-test="login-button"]').click();
  cy.url().should('include', '/inventory.html');
};

describe('Cart', () => {
  it('adding an item updates the cart badge', () => {
    login();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
  });

  it('cart page shows the added item and a checkout button', () => {
    login();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();

    cy.get('[data-test="inventory-item-name"]').should('contain.text', 'Sauce Labs Backpack');
    cy.get('[data-test="checkout"]').should('be.visible');
  });
});
