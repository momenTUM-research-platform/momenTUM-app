/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      clearIonicStorage(): Chainable<void>;
      createAndStoreStudy(): void;

      // login(email: string, password: string): Chainable<void>
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

// cypress/support/commands.js
import { Storage } from '@ionic/storage';

const storage = new Storage();
let store: Storage;

// @ts-ignore
Cypress.Commands.add('clearIonicStorage', async () => {
  store = await storage.create();
  store.clear();
});

Cypress.Commands.add('createAndStoreStudy', () => {
  const uniqueId =
    Date.now().toString(36) + Math.random().toString(36).substring(2);
  cy.fixture('study_tasks.json').then(async (studyData) => {
    store = await storage.create();

    await store.set('enrolment-date', new Date());
    await store.set('uuid', uniqueId);
    await store.set('current-study', JSON.stringify(studyData.study));
    await store.set('study-tasks', JSON.stringify(studyData.tasks));
  });
});
