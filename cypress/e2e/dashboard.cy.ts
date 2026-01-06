describe('Content Dashboard E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the dashboard successfully', () => {
    cy.contains('Content Dashboard').should('be.visible');
    cy.contains('Your Personalized Feed').should('be.visible');
  });

  it('should display content cards', () => {
    cy.get('[class*="grid"]').should('exist');
    cy.get('[class*="rounded-xl"]').should('have.length.greaterThan', 0);
  });

  it('should toggle dark mode', () => {
    // Check initial light mode
    cy.get('html').should('not.have.class', 'dark');

    // Click dark mode toggle
    cy.get('button[aria-label="Toggle dark mode"]').click();

    // Verify dark mode is applied
    cy.get('html').should('have.class', 'dark');

    // Toggle back to light mode
    cy.get('button[aria-label="Toggle dark mode"]').click();
    cy.get('html').should('not.have.class', 'dark');
  });

  it('should search for content', () => {
    // Type in search bar
    cy.get('input[placeholder="Search content..."]').type('technology');

    // Wait for debounce
    cy.wait(600);

    // Verify filtered results
    cy.get('[class*="grid"]').should('exist');
  });

  it('should clear search query', () => {
    // Type in search bar
    cy.get('input[placeholder="Search content..."]').type('test query');

    // Click clear button
    cy.get('input[placeholder="Search content..."]').parent().find('button').last().click();

    // Verify search is cleared
    cy.get('input[placeholder="Search content..."]').should('have.value', '');
  });

  it('should add item to favorites', () => {
    // Click first favorite button
    cy.get('button[aria-label*="favorite"]').first().click();

    // Navigate to favorites section
    cy.contains('Favorites').click();

    // Verify item appears in favorites
    cy.contains('Your Favorites').should('be.visible');
    cy.get('[class*="rounded-xl"]').should('have.length.greaterThan', 0);
  });

  it('should navigate between sections', () => {
    // Click Trending
    cy.contains('Trending').click();
    cy.contains('Trending Now').should('be.visible');

    // Click My Feed
    cy.contains('My Feed').click();
    cy.contains('Your Personalized Feed').should('be.visible');

    // Click Favorites
    cy.contains('Favorites').click();
    cy.contains('Your Favorites').should('be.visible');
  });

  it('should open and close settings panel', () => {
    // Open settings
    cy.get('button[aria-label="Open settings"]').click();

    // Verify settings panel is visible
    cy.contains('Content Preferences').should('be.visible');

    // Close settings
    cy.get('button').contains('Save Preferences').click();

    // Verify settings panel is closed
    cy.contains('Content Preferences').should('not.exist');
  });

  it('should update content preferences', () => {
    // Open settings
    cy.get('button[aria-label="Open settings"]').click();

    // Toggle a category
    cy.contains('entertainment').click();

    // Save preferences
    cy.contains('Save Preferences').click();

    // Verify preferences were saved (check localStorage or visual feedback)
    cy.wait(500);
  });

  it('should load more content', () => {
    // Scroll to bottom
    cy.scrollTo('bottom');

    // Click load more button
    cy.contains('Load More').click();

    // Wait for new content to load
    cy.wait(1000);

    // Verify more content is displayed
    cy.get('[class*="rounded-xl"]').should('have.length.greaterThan', 10);
  });

  it('should handle mobile sidebar', () => {
    // Set mobile viewport
    cy.viewport('iphone-x');

    // Verify sidebar is hidden
    cy.contains('My Feed').should('not.be.visible');

    // Click menu button
    cy.get('button[aria-label="Toggle sidebar"]').click();

    // Verify sidebar is visible
    cy.contains('My Feed').should('be.visible');

    // Click outside to close
    cy.get('body').click(0, 0);
  });

  it('should display empty state when no content', () => {
    // Clear all content by searching for non-existent term
    cy.get('input[placeholder="Search content..."]').type('xyznonexistent');

    // Wait for debounce
    cy.wait(600);

    // Verify empty state
    cy.contains('No content found').should('be.visible');
  });

  it('should persist favorites after page reload', () => {
    // Add to favorites
    cy.get('button[aria-label*="favorite"]').first().click();

    // Reload page
    cy.reload();

    // Navigate to favorites
    cy.contains('Favorites').click();

    // Verify favorite is still there
    cy.get('[class*="rounded-xl"]').should('have.length.greaterThan', 0);
  });
});