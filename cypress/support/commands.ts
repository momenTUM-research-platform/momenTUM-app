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
      setStudy(): Promise<void>;

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
  cy.fixture('study-tasks.json').then(async (studyData) => {
    store = await storage.create();

    await store.set('enrolment-date', new Date());
    await store.set('uuid', uniqueId);
    await store.set('current-study', JSON.stringify(studyData.study));
    await store.set('study-tasks', JSON.stringify(studyData.tasks));
  });
});

Cypress.Commands.add('setStudy', async () => {
  store.set('condition', 'Control');
  store.set(
    'current-study',
    '{"properties":{"study_name":"Demo","study_id":"3ZDOGAH","created_by":"Adrian Shatte","instructions":"This is a demo study showing the features of schema","post_url":"https://tuspl22-momentum.srv.mwn.de/redcap/import","empty_msg":"You\'re all up to date","banner_url":"https://getschema.app/img/schema_banner.png","support_url":"https://getschema.app","support_email":"hello@getschema.app","conditions":["Control","Treatment"],"cache":false,"ethics":"This study was approved by ethics body with approval #123456789","pls":"https://getschema.app/pls-file-link.pdf"},"modules":[{"type":"info","name":"Welcome","submit_text":"Submit","alerts":{"title":"Welcome to the study","message":"Tap to open the app","duration":1,"times":[{"hours":8,"minutes":30}],"random":true,"random_interval":30,"sticky":true,"sticky_label":"Start here","timeout":false,"timeout_after":0,"start_offset":0},"graph":{"display":false},"sections":[{"name":"Welcome","questions":[{"id":"instruction-1wnjocfw","type":"instruction","text":"Hello! Welcome to the study! This module only shows for those enrolled in the control condition.","required":false,"hide_id":"","hide_value":"","hide_if":true}],"shuffle":false}],"shuffle":false,"condition":"Control","uuid":"3fb09fcd-4fca-4074-a395-34d65ee5a521","unlock_after":[]},{"type":"survey","name":"Elements","submit_text":"Submit","alerts":{"title":"Elements Demo","message":"Tap to open app","duration":5,"times":[{"hours":9,"minutes":30},{"hours":12,"minutes":30},{"hours":15,"minutes":30},{"hours":18,"minutes":30}],"random":true,"random_interval":30,"sticky":false,"sticky_label":"","timeout":true,"timeout_after":30,"start_offset":1},"graph":{"display":true,"title":"Slider Graph","blurb":"This graph displays the values from the slider element as a bar graph, displaying the past 7 responses.","variable":"slider-0yih1evt","type":"bar","max_points":7},"sections":[{"name":"Section 1","questions":[{"id":"instruction-pvke1yey","type":"instruction","text":"This is an instruction type.","required":false,"hide_id":"","hide_value":"","hide_if":true},{"id":"text-71nnpqzi","type":"text","text":"This is a text input type.","required":true,"hide_id":"","hide_value":"","hide_if":true,"subtype":"short"},{"id":"datetime-79ygddzl","type":"datetime","text":"This is a date input type (date only).","required":true,"hide_id":"","hide_value":"","hide_if":true,"subtype":"date"},{"id":"multi-q8bohlar","type":"multi","text":"This is a multiple choice type with branching demo.","required":true,"hide_id":"","hide_value":"","hide_if":true,"modal":false,"radio":true,"shuffle":true,"options":["apple","orange","banana"]},{"id":"instruction-mof4ymv4","type":"instruction","text":"This will only show if the user selects banana from the previous question","required":false,"hide_id":"multi-q8bohlar","hide_value":"banana","hide_if":false}],"shuffle":false},{"name":"Section 2","questions":[{"id":"media-o3p069gi","type":"media","text":"This is a media type.","required":false,"hide_id":"","hide_value":"","hide_if":true,"subtype":"image","src":"https://getschema.app/img/schema_banner.jpg","thumb":""},{"id":"slider-0yih1evt","type":"slider","text":"This is a slider type","required":true,"hide_id":"","hide_value":"","hide_if":true,"min":0,"max":10,"hint_left":"less","hint_right":"more"},{"id":"yesno-mv09ggb1","type":"yesno","text":"This is a switch","required":true,"hide_id":"","hide_value":"","hide_if":true,"yes_text":"Yes","no_text":"No"}],"shuffle":false}],"shuffle":false,"condition":"*","uuid":"dee87a08-8616-453a-9a6e-9e8f8ea9c942","unlock_after":[]}]}'
  );
  store.set('enrolment-date', '2022-07-14T00:01:43.794Z');
  store.set('notifications-enabled', 'true');
  store.set('uuid', 'JgC3bwWMOIcXtFCnM66zR');
  store.set('uuid-set', 'true');

  store.set('study-tasks', [
    {
      uuid: '3fb09fcd-4fca-4074-a395-34d65ee5a521',
      index: 0,
      task_id: 101,
      name: 'Welcome',
      type: 'bulb-outline',
      hidden: false,
      unlock_after: [],
      sticky: true,
      sticky_label: 'Start here',
      alert_title: 'Welcome to the study',
      alert_message: 'Tap to open the app',
      timeout: false,
      timeout_after: 0,
      time: 'Thu Jul 14 2022 08:31:00 GMT+0200 (Central European Summer Time)',
      locale: 'Thu, July 14, 2022 at 8:31 AM',
      completed: false,
    },
    {
      uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
      index: 1,
      task_id: 102,
      name: 'Elements',
      type: 'checkmark-circle-outline',
      hidden: true,
      unlock_after: [],
      sticky: false,
      sticky_label: '',
      alert_title: 'Elements Demo',
      alert_message: 'Tap to open app',
      timeout: true,
      timeout_after: 30,
      time: 'Fri Jul 15 2022 09:20:00 GMT+0200 (Central European Summer Time)',
      locale: 'Fri, July 15, 2022 at 9:20 AM',
      completed: false,
    },
    {
      uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
      index: 1,
      task_id: 103,
      name: 'Elements',
      type: 'checkmark-circle-outline',
      hidden: true,
      unlock_after: [],
      sticky: false,
      sticky_label: '',
      alert_title: 'Elements Demo',
      alert_message: 'Tap to open app',
      timeout: true,
      timeout_after: 30,
      time: 'Fri Jul 15 2022 12:00:00 GMT+0200 (Central European Summer Time)',
      locale: 'Fri, July 15, 2022 at 12:00 PM',
      completed: false,
    },
    {
      uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
      index: 1,
      task_id: 104,
      name: 'Elements',
      type: 'checkmark-circle-outline',
      hidden: true,
      unlock_after: [],
      sticky: false,
      sticky_label: '',
      alert_title: 'Elements Demo',
      alert_message: 'Tap to open app',
      timeout: true,
      timeout_after: 30,
      time: 'Fri Jul 15 2022 15:41:00 GMT+0200 (Central European Summer Time)',
      locale: 'Fri, July 15, 2022 at 3:41 PM',
      completed: false,
    },
    {
      uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
      index: 1,
      task_id: 105,
      name: 'Elements',
      type: 'checkmark-circle-outline',
      hidden: true,
      unlock_after: [],
      sticky: false,
      sticky_label: '',
      alert_title: 'Elements Demo',
      alert_message: 'Tap to open app',
      timeout: true,
      timeout_after: 30,
      time: 'Fri Jul 15 2022 18:37:00 GMT+0200 (Central European Summer Time)',
      locale: 'Fri, July 15, 2022 at 6:37 PM',
      completed: false,
    },
    {
      uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
      index: 1,
      task_id: 106,
      name: 'Elements',
      type: 'checkmark-circle-outline',
      hidden: true,
      unlock_after: [],
      sticky: false,
      sticky_label: '',
      alert_title: 'Elements Demo',
      alert_message: 'Tap to open app',
      timeout: true,
      timeout_after: 30,
      time: 'Sat Jul 16 2022 09:03:00 GMT+0200 (Central European Summer Time)',
      locale: 'Sat, July 16, 2022 at 9:03 AM',
      completed: false,
    },
    {
      uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
      index: 1,
      task_id: 107,
      name: 'Elements',
      type: 'checkmark-circle-outline',
      hidden: true,
      unlock_after: [],
      sticky: false,
      sticky_label: '',
      alert_title: 'Elements Demo',
      alert_message: 'Tap to open app',
      timeout: true,
      timeout_after: 30,
      time: 'Sat Jul 16 2022 12:04:00 GMT+0200 (Central European Summer Time)',
      locale: 'Sat, July 16, 2022 at 12:04 PM',
      completed: false,
    },
    {
      uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
      index: 1,
      task_id: 108,
      name: 'Elements',
      type: 'checkmark-circle-outline',
      hidden: true,
      unlock_after: [],
      sticky: false,
      sticky_label: '',
      alert_title: 'Elements Demo',
      alert_message: 'Tap to open app',
      timeout: true,
      timeout_after: 30,
      time: 'Sat Jul 16 2022 15:14:00 GMT+0200 (Central European Summer Time)',
      locale: 'Sat, July 16, 2022 at 3:14 PM',
      completed: false,
    },
    {
      uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
      index: 1,
      task_id: 109,
      name: 'Elements',
      type: 'checkmark-circle-outline',
      hidden: true,
      unlock_after: [],
      sticky: false,
      sticky_label: '',
      alert_title: 'Elements Demo',
      alert_message: 'Tap to open app',
      timeout: true,
      timeout_after: 30,
      time: 'Sat Jul 16 2022 18:06:00 GMT+0200 (Central European Summer Time)',
      locale: 'Sat, July 16, 2022 at 6:06 PM',
      completed: false,
    },
    {
      uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
      index: 1,
      task_id: 110,
      name: 'Elements',
      type: 'checkmark-circle-outline',
      hidden: true,
      unlock_after: [],
      sticky: false,
      sticky_label: '',
      alert_title: 'Elements Demo',
      alert_message: 'Tap to open app',
      timeout: true,
      timeout_after: 30,
      time: 'Sun Jul 17 2022 09:15:00 GMT+0200 (Central European Summer Time)',
      locale: 'Sun, July 17, 2022 at 9:15 AM',
      completed: false,
    },
    {
      uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
      index: 1,
      task_id: 111,
      name: 'Elements',
      type: 'checkmark-circle-outline',
      hidden: true,
      unlock_after: [],
      sticky: false,
      sticky_label: '',
      alert_title: 'Elements Demo',
      alert_message: 'Tap to open app',
      timeout: true,
      timeout_after: 30,
      time: 'Sun Jul 17 2022 12:11:00 GMT+0200 (Central European Summer Time)',
      locale: 'Sun, July 17, 2022 at 12:11 PM',
      completed: false,
    },
    {
      uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
      index: 1,
      task_id: 112,
      name: 'Elements',
      type: 'checkmark-circle-outline',
      hidden: true,
      unlock_after: [],
      sticky: false,
      sticky_label: '',
      alert_title: 'Elements Demo',
      alert_message: 'Tap to open app',
      timeout: true,
      timeout_after: 30,
      time: 'Sun Jul 17 2022 15:18:00 GMT+0200 (Central European Summer Time)',
      locale: 'Sun, July 17, 2022 at 3:18 PM',
      completed: false,
    },
    {
      uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
      index: 1,
      task_id: 113,
      name: 'Elements',
      type: 'checkmark-circle-outline',
      hidden: true,
      unlock_after: [],
      sticky: false,
      sticky_label: '',
      alert_title: 'Elements Demo',
      alert_message: 'Tap to open app',
      timeout: true,
      timeout_after: 30,
      time: 'Sun Jul 17 2022 18:49:00 GMT+0200 (Central European Summer Time)',
      locale: 'Sun, July 17, 2022 at 6:49 PM',
      completed: false,
    },
    {
      uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
      index: 1,
      task_id: 114,
      name: 'Elements',
      type: 'checkmark-circle-outline',
      hidden: true,
      unlock_after: [],
      sticky: false,
      sticky_label: '',
      alert_title: 'Elements Demo',
      alert_message: 'Tap to open app',
      timeout: true,
      timeout_after: 30,
      time: 'Mon Jul 18 2022 09:28:00 GMT+0200 (Central European Summer Time)',
      locale: 'Mon, July 18, 2022 at 9:28 AM',
      completed: false,
    },
    {
      uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
      index: 1,
      task_id: 115,
      name: 'Elements',
      type: 'checkmark-circle-outline',
      hidden: true,
      unlock_after: [],
      sticky: false,
      sticky_label: '',
      alert_title: 'Elements Demo',
      alert_message: 'Tap to open app',
      timeout: true,
      timeout_after: 30,
      time: 'Mon Jul 18 2022 12:24:00 GMT+0200 (Central European Summer Time)',
      locale: 'Mon, July 18, 2022 at 12:24 PM',
      completed: false,
    },
    {
      uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
      index: 1,
      task_id: 116,
      name: 'Elements',
      type: 'checkmark-circle-outline',
      hidden: true,
      unlock_after: [],
      sticky: false,
      sticky_label: '',
      alert_title: 'Elements Demo',
      alert_message: 'Tap to open app',
      timeout: true,
      timeout_after: 30,
      time: 'Mon Jul 18 2022 15:44:00 GMT+0200 (Central European Summer Time)',
      locale: 'Mon, July 18, 2022 at 3:44 PM',
      completed: false,
    },
    {
      uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
      index: 1,
      task_id: 117,
      name: 'Elements',
      type: 'checkmark-circle-outline',
      hidden: true,
      unlock_after: [],
      sticky: false,
      sticky_label: '',
      alert_title: 'Elements Demo',
      alert_message: 'Tap to open app',
      timeout: true,
      timeout_after: 30,
      time: 'Mon Jul 18 2022 18:27:00 GMT+0200 (Central European Summer Time)',
      locale: 'Mon, July 18, 2022 at 6:27 PM',
      completed: false,
    },
    {
      uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
      index: 1,
      task_id: 118,
      name: 'Elements',
      type: 'checkmark-circle-outline',
      hidden: true,
      unlock_after: [],
      sticky: false,
      sticky_label: '',
      alert_title: 'Elements Demo',
      alert_message: 'Tap to open app',
      timeout: true,
      timeout_after: 30,
      time: 'Tue Jul 19 2022 09:22:00 GMT+0200 (Central European Summer Time)',
      locale: 'Tue, July 19, 2022 at 9:22 AM',
      completed: false,
    },
    {
      uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
      index: 1,
      task_id: 119,
      name: 'Elements',
      type: 'checkmark-circle-outline',
      hidden: true,
      unlock_after: [],
      sticky: false,
      sticky_label: '',
      alert_title: 'Elements Demo',
      alert_message: 'Tap to open app',
      timeout: true,
      timeout_after: 30,
      time: 'Tue Jul 19 2022 12:09:00 GMT+0200 (Central European Summer Time)',
      locale: 'Tue, July 19, 2022 at 12:09 PM',
      completed: false,
    },
    {
      uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
      index: 1,
      task_id: 120,
      name: 'Elements',
      type: 'checkmark-circle-outline',
      hidden: true,
      unlock_after: [],
      sticky: false,
      sticky_label: '',
      alert_title: 'Elements Demo',
      alert_message: 'Tap to open app',
      timeout: true,
      timeout_after: 30,
      time: 'Tue Jul 19 2022 15:33:00 GMT+0200 (Central European Summer Time)',
      locale: 'Tue, July 19, 2022 at 3:33 PM',
      completed: false,
    },
    {
      uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
      index: 1,
      task_id: 121,
      name: 'Elements',
      type: 'checkmark-circle-outline',
      hidden: true,
      unlock_after: [],
      sticky: false,
      sticky_label: '',
      alert_title: 'Elements Demo',
      alert_message: 'Tap to open app',
      timeout: true,
      timeout_after: 30,
      time: 'Tue Jul 19 2022 18:30:00 GMT+0200 (Central European Summer Time)',
      locale: 'Tue, July 19, 2022 at 6:30 PM',
      completed: false,
    },
  ]);
});
