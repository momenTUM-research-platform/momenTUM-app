describe('Survey Testing', () => {
  beforeEach('opens the app', () => {
    cy.clearIonicStorage();
    cy.visit('http://localhost:8000');
  });
  it('should display the app', () => {
    cy.contains("Let's get started").should('be.visible');
  });
  it('should display the app', () => {
    cy.contains("Let's get started").should('be.visible');
  });
  it('should display the app', () => {
    cy.contains("Let's get started").should('be.visible');
  });
  it('should display the app', () => {
    cy.contains("Let's get started").should('be.visible');
  });
  it('should display the app', () => {
    cy.contains("Let's get started").should('be.visible');
  });
  it('should display the app', () => {
    cy.contains("Let's get started").should('be.visible');
  });
  // it.only('Should enroll in a study', () => {
  //   cy.contains("Let's get started", { timeout: 30000 }).should('be.visible');
  //   // cy.contains('Home').click();
  //   // cy.contains('Enter URL', { matchCase: false }).click();
  //   // cy.get('input')
  //   //   .click()
  //   //   .type('tuspl22-momentum.srv.mwn.de/api/surveys/demo');
  //   // cy.contains('Enrol').click();
  //   // cy.contains("You're all up to date");
  // });
});
