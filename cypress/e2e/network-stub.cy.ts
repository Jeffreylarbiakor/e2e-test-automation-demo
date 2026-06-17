describe('Network stub via cy.intercept()', () => {
  it('stubs GET /posts/1 and returns fixture JSON', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts/1', {
      fixture: 'posts.json',
    }).as('getPost');

    // Visit any page so cy.window() fetch goes through the browser network
    // stack where cy.intercept() can intercept it. about:blank can't be used
    // when baseUrl is set, so we use the app's login page.
    cy.visit('/');
    cy.window().then((win) => {
      win.fetch('https://jsonplaceholder.typicode.com/posts/1');
    });

    cy.wait('@getPost').its('response.body').should((body) => {
      const parsed = typeof body === 'string' ? JSON.parse(body) : body;
      expect(parsed.title).to.eq('stubbed post title from fixture');
      expect(parsed.userId).to.eq(99);
    });
  });
});
