import { HttpClient, HttpHandler } from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage-angular';

import { SurveyDataService } from './survey-data.service';

describe('SurveyDataService', () => {
  let service: SurveyDataService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient, HttpHandler, HTTP, Storage],
    });
    service = TestBed.inject(SurveyDataService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //getRemoteData(surveyURL: string)

  it('should get remote data from survey URL', () => {
    const mockURL =
      'https://gist.githubusercontent.com/BlenDaniel/6f44bdf665123d612295ed47d1a58a77/raw/40e95e86ff86267f0dae21491102c5f32fe283f9/Test.json';
    const mockResponse = {
      properties: {
        study_name: 'Demo',
        study_id: '3ZDOGAH',
        created_by: 'Adrian Shatte',
        instructions: 'This is a demo study showing the features of schema',
        post_url: 'https://tuspl22-momentum.srv.mwn.de/post.php',
        empty_msg: "You're all up to date",
        banner_url: 'https://getschema.app/img/schema_banner.png',
        support_url: 'https://getschema.app',
        support_email: 'hello@getschema.app',
        conditions: ['Control', 'Treatment'],
        cache: false,
        ethics:
          'This study was approved by ethics body with approval #123456789',
        pls: 'https://getschema.app/pls-file-link.pdf',
      },
      modules: [
        {
          type: 'info',
          name: 'Welcome',
          submit_text: 'Submit',
          alerts: {
            title: 'Welcome to the study',
            message: 'Tap to open the app',
            duration: 1,
            times: [
              {
                hours: 8,
                minutes: 30,
              },
            ],
            random: true,
            random_interval: 30,
            sticky: true,
            sticky_label: 'Start here',
            timeout: false,
            timeout_after: 0,
            start_offset: 0,
          },
          graph: {
            display: false,
          },
          sections: [
            {
              name: 'Welcome',
              questions: [
                {
                  id: 'instruction-1wnjocfw',
                  type: 'instruction',
                  text: 'Hello! Welcome to the study! This module only shows for those enrolled in the control condition.',
                  required: false,
                  hide_id: '',
                  hide_value: '',
                  hide_if: true,
                },
              ],
              shuffle: false,
            },
          ],
          shuffle: false,
          condition: 'Control',
          id: '3fb09fcd-4fca-4074-a395-34d65ee5a521',
          unlock_after: [],
        },
        {
          type: 'survey',
          name: 'Elements',
          submit_text: 'Submit',
          alerts: {
            title: 'Elements Demo',
            message: 'Tap to open app',
            duration: 5,
            times: [
              {
                hours: 9,
                minutes: 30,
              },
              {
                hours: 12,
                minutes: 30,
              },
              {
                hours: 15,
                minutes: 30,
              },
              {
                hours: 18,
                minutes: 30,
              },
            ],
            random: true,
            random_interval: 30,
            sticky: false,
            sticky_label: '',
            timeout: true,
            timeout_after: 30,
            start_offset: 1,
          },
          graph: {
            display: true,
            title: 'Slider Graph',
            blurb:
              'This graph displays the values from the slider element as a bar graph, displaying the past 7 responses.',
            variable: 'slider-0yih1evt',
            type: 'bar',
            max_points: 7,
          },
          sections: [
            {
              name: 'Section 1',
              questions: [
                {
                  id: 'instruction-pvke1yey',
                  type: 'instruction',
                  text: 'This is an instruction type.',
                  required: false,
                  hide_id: '',
                  hide_value: '',
                  hide_if: true,
                },
                {
                  id: 'text-71nnpqzi',
                  type: 'text',
                  text: 'This is a text input type.',
                  required: true,
                  hide_id: '',
                  hide_value: '',
                  hide_if: true,
                  subtype: 'short',
                },
                {
                  id: 'datetime-79ygddzl',
                  type: 'datetime',
                  text: 'This is a date input type (date only).',
                  required: true,
                  hide_id: '',
                  hide_value: '',
                  hide_if: true,
                  subtype: 'date',
                },
                {
                  id: 'multi-q8bohlar',
                  type: 'multi',
                  text: 'This is a multiple choice type with branching demo.',
                  required: true,
                  hide_id: '',
                  hide_value: '',
                  hide_if: true,
                  modal: false,
                  radio: true,
                  shuffle: true,
                  options: ['apple', 'orange', 'banana'],
                },
                {
                  id: 'instruction-mof4ymv4',
                  type: 'instruction',
                  text: 'This will only show if the user selects banana from the previous question',
                  required: false,
                  hide_id: 'multi-q8bohlar',
                  hide_value: 'banana',
                  hide_if: false,
                },
              ],
              shuffle: false,
            },
            {
              name: 'Section 2',
              questions: [
                {
                  id: 'media-o3p069gi',
                  type: 'media',
                  text: 'This is a media type.',
                  required: false,
                  hide_id: '',
                  hide_value: '',
                  hide_if: true,
                  subtype: 'image',
                  src: 'https://getschema.app/img/schema_banner.jpg',
                  thumb: '',
                },
                {
                  id: 'slider-0yih1evt',
                  type: 'slider',
                  text: 'This is a slider type',
                  required: true,
                  hide_id: '',
                  hide_value: '',
                  hide_if: true,
                  min: 0,
                  max: 10,
                  hint_left: 'less',
                  hint_right: 'more',
                },
                {
                  id: 'yesno-mv09ggb1',
                  type: 'yesno',
                  text: 'This is a switch',
                  required: true,
                  hide_id: '',
                  hide_value: '',
                  hide_if: true,
                  yes_text: 'Yes',
                  no_text: 'No',
                },
              ],
              shuffle: false,
            },
          ],
          shuffle: false,
          condition: '*',
          uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
          unlock_after: [],
        },
      ],
    };

    service
      .getRemoteData(mockURL)
      .then((file) => {
        expect(file).toBeTruthy();
        expect(file).toContain(
          "'properties': { 'study_name': 'Demo','study_id': '3ZDOGAH','created_by': 'Adrian Shatte','instructions': 'This is a demo study showing the features of schema','post_url': 'https://tuspl22-momentum.srv.mwn.de/post.php','empty_msg': 'You're all up to date','banner_url': 'https://getschema.app/img/schema_banner.png','support_url': 'https://getschema.app','support_email': 'hello@getschema.app','conditions': ['Control','Treatment'],'cache': false,'ethics': 'This study was approved by ethics body with approval #123456789','pls': 'https://getschema.app/pls-file-link.pdf'}"
        );
        expect(file).toBe(mockResponse);
      })
      .catch((error) => {
        console.log(error);
      });

    const mockRequest = httpTestingController.expectOne(
      'https://gist.githubusercontent.com/BlenDaniel/6f44bdf665123d612295ed47d1a58a77/raw/40e95e86ff86267f0dae21491102c5f32fe283f9/Test.json'
    );

    expect(mockRequest.request.method).toEqual('GET');

    // Resolve with our mock data
    mockRequest.flush(mockResponse);
  });

  //async saveToLocalStorage(key, data)

  //sendSurveyDataToServer(surveyData)

  //logPageVisitToServer(logEvent)

  //uploadPendingData(dataType)

  //attemptHttpPost(postURL, bodyData)
});
