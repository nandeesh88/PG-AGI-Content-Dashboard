describe('User Journey - Critical Flows', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('searches and uses debounce to show filtered results', () => {
    const input = cy.get('input[placeholder="Search content across all categories..."]');
    input.clear().type('Technology');
    // debounce in app is immediate after typing waits a bit
    cy.wait(500);
    cy.get('[class*="grid"]').find('div').its('length').should('be.gte', 1);
  });

  it('adds item to favorites and reorders favorites via drag-and-drop', () => {
    // add two items to favorites
    cy.get('[class*="grid"]').within(() => {
      cy.get('button').first().click();
      cy.get('button').eq(1).click();
    });

    // navigate to favorites
    cy.contains('Favorites').click();

    // assert two favorites present
    cy.get('[class*="grid"]').find('div').should('have.length.gte', 2);

    // capture first and second titles
    cy.get('[class*="grid"]').find('h3').then(($h3) => {
      const firstText = $h3[0].innerText;
      const secondText = $h3[1].innerText;

      // perform drag: simulate pointer events to reorder
      const firstCard = cy.wrap($h3[0].closest('div')!.closest('div'));
      const secondCard = cy.wrap($h3[1].closest('div')!.closest('div'));

      // trigger mousedown and mousemove to emulate drag
      firstCard.trigger('mousedown', { button: 0, force: true });
      secondCard.trigger('mousemove', { force: true }).trigger('mouseup', { force: true });

      // wait and verify that the order changed (simple heuristic: title moved)
      cy.get('[class*="grid"]').find('h3').first().should(($firstNew) => {
        expect($firstNew.text()).to.not.equal(firstText);
      });
    });
  });

  it('tests responsive layout across viewports', () => {
    // desktop
    cy.viewport(1280, 800);
    cy.get('[class*="grid"]').should('be.visible');

    // tablet
    cy.viewport(768, 1024);
    cy.get('[class*="grid"]').should('be.visible');

    // mobile
    cy.viewport('iphone-x');
    // hamburger/menu exists
    cy.get('button').contains('Profile').should('not.be.visible');
    cy.get('button[aria-label="Toggle sidebar"]').click({ force: true });
    cy.contains('Favorites').should('be.visible');
  });

  it('toggles dark mode and persists across reloads', () => {
    // ensure toggle exists and initial state stored
    cy.get('button').contains('Sun').should('not.exist');
    // Click dark mode toggle (use the visible button in header)
    cy.get('button').contains('Profile').parent().prev().click({ force: true });

    // html should now have dark class
    cy.get('html').should('have.class', 'dark');

    // reload page and confirm persistence
    cy.reload();
    cy.get('html').should('have.class', 'dark');
  });

  it('opens and closes settings panel', () => {
    cy.get('button[aria-label="Open settings"]').click({ force: true });
    cy.contains('Content Preferences').should('be.visible');
    cy.get('button').contains('Save Preferences').click();
    cy.contains('Content Preferences').should('not.exist');
  });

  it('infinite scroll / load more loads additional items', () => {
    // assume initial count
    cy.get('[class*="rounded-3xl"]').its('length').then((initial) => {
      cy.scrollTo('bottom');
      cy.contains('Load More').click({ force: true });
      cy.wait(500);
      cy.get('[class*="rounded-3xl"]').its('length').should('be.gt', initial);
    });
  });

  it('navigation menu works on mobile', () => {
    cy.viewport('iphone-6');
    cy.get('button[aria-label="Toggle sidebar"]').click({ force: true });
    cy.contains('My Feed').should('be.visible').click();
    cy.contains('Your Content Feed').should('be.visible');
  });

  it('interactive elements are keyboard accessible', () => {
    cy.get('a, button, input').first().focus();
    cy.focused().tab();
    cy.focused().should('exist');
  });
});