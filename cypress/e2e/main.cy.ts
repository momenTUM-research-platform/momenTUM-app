// Deliberatly not tested functionality:
// - Using barcodes to download survey
// - Email and website redirect on settings page

describe('Initialization Testing', () => {
  beforeEach('opens the app', () => {
    cy.clearIonicStorage();
    cy.visit('http://localhost:8000');
  });

  it('Should attempt using the camera', () => {
    cy.contains('Scan QR Code').click();
    cy.contains(
      'Camera permission is required to scan QR codes. You can allow this permission in Settings.'
    );
    cy.contains('Dismiss').click();
  });
  it('Should enroll in study via id', () => {
    cy.contains('Study ID').click();
    cy.get('input').click().type('demo');
    cy.contains('Enrol').click();
    cy.contains("You're all up to date");
  });

  it('Should enroll in a study via link', () => {
    cy.contains("Let's get started", { timeout: 10000 }).should('be.visible');
    cy.contains('Home').click();
    cy.contains('Enter URL', { matchCase: false }).click();
    cy.get('input')
      .click()
      .type('tuspl22-momentum.srv.mwn.de/api/surveys/demo', {});
    cy.contains('Enrol').click();
    cy.contains("You're all up to date");
  });
});

describe('Page Testing', () => {
  before('load the survey', () => {
    // cy.clock(new Date().getTime());
    cy.clearIonicStorage();
    cy.visit('http://localhost:8000');
    cy.contains("Let's get started", { timeout: 10000 }).should('be.visible');
    cy.contains('Home').click();
    cy.contains('Enter URL', { matchCase: false }).click();
    cy.get('input')
      .click()
      .type('tuspl22-momentum.srv.mwn.de/api/surveys/demo', { force: true });

    cy.contains('Enrol').click();
    cy.contains("You're all up to date");
  });
  it('Should visit the progress page', () => {
    cy.contains('My Progress').click();
    cy.contains(
      'As you complete tasks, your progress will be updated in this tab'
    );
  });

  it('Should visit the settings page', () => {
    cy.contains('Settings').click();
    cy.contains('User ID');
    cy.contains('Notifications');
    cy.contains('About this study');
    cy.contains('Support');
    cy.contains('Ethics Information');
    cy.contains('Withdraw');
  });
  it('Should cancel withdrawing from the study', () => {
    cy.contains('Settings').click();
    cy.contains('Withdraw from study').click();
    cy.contains('Are you sure?');

    cy.contains('Cancel').click();
  });
  it('Should withdraw from the study', () => {
    cy.contains('Settings').click();
    cy.contains('Withdraw from study').click();
    cy.get('button').last().click();
    cy.contains("Let's get started");
  });
});
// Not working yet, merging anyway as cypress is needed on other branches
// describe.only('Survey testing', () => {
//   beforeEach('load the survey', () => {
//     cy.setStudy();
//   });
//   it('Should display the first section', () => {
//     cy.visit('http://localhost:8000');
//     cy.clock();

//     cy.contains('Settings').click({ force: true });
//     cy.contains('User ID');
//     cy.contains('JgC3bwWMOIcXtFCnM66zR');
//     cy.contains('Support');
//     // cy.tick(1000 * 60 * 60 * 24 * 7);
//     // cy.contains('Support');
//     cy.contains('Home').click({ force: true });
//     // // cy.contains('up to date').should('be.visible');
//     // cy.contains('Welcome', { timeout: 200000 }).click();
//     cy.contains('Loading');
//     cy.contains('Welcome').should('be.visible');
//   });
// });
