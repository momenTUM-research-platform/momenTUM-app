import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { StudyTasksService } from 'src/app/services/study-tasks/study-tasks.service';
import { DataService } from '../../services/data/data.service';
import { NavController, IonContent, ToastController, AlertController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import * as moment from 'moment';
import { StorageService } from '../../services/storage/storage.service';
import { Capacitor } from '@capacitor/core';
import { Survey, Question, Text as TextQuestion } from 'src/app/interfaces/study';
import { Response, SurveyResponse } from 'src/app/interfaces/types';
import { SplashScreen } from '@capacitor/splash-screen';
import { PhotoService } from '../../services/photo/photo.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  sectionIndex = 0;
  sectionName = '';

  survey: Survey;
  task_id: string;
  task_index: number;
  loaded = false;

  photoUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private storage: StorageService,
    private domSanitizer: DomSanitizer,
    private navController: NavController,
    private photoService: PhotoService,
    private studyTasksService: StudyTasksService,
    private surveyDataService: DataService,
    private toastController: ToastController,
    private alertController: AlertController,
    private ngZone: NgZone
  ) {}

  private stripHtmlCollapse(s: string): string {
    if (!s) return '';
    const div = document.createElement('div');
    div.innerHTML = s;
    const text = div.textContent || div.innerText || '';
    return text.replace(/\s+/g, ' ').trim();
  }

  private normalizeOption(raw: string, idx1: number): {
    text: string;
    checked: boolean;
    code: string;
    plain: string;
    safeHtml: SafeHtml;
  } {
    const plain = this.stripHtmlCollapse(raw);
    const matchNum = plain.match(/^\s*(-?\d+)/);
    const code = matchNum ? matchNum[1] : String(idx1);
    const hasHtml = /<\/?[a-z][\s\S]*>/i.test(raw);
    const html = hasHtml
      ? raw
      : `<div class="ema-opt"><span class="title">${plain}</span></div>`;

    return {
      text: raw,
      checked: false,
      code,
      plain,
      safeHtml: this.domSanitizer.bypassSecurityTrustHtml(html),
    };
  }

  async ngOnInit() {
    window.addEventListener('message', (e) => {
      if (Object.prototype.hasOwnProperty.call(e.data, 'frameHeight')) {
        const sel = `iframe[src^="${e.data.url}"]`;
        const el = document.querySelector(sel) as HTMLElement;
        if (el) {
          el.style.height = `${e.data.frameHeight + 10}px`;
          el.style.width = `99%`;
        }
      }
    });

    this.task_id = this.route.snapshot.paramMap.get('task_id');
    const task = await this.storage.getTaskByID(this.task_id);
    this.task_index = task.index;

    const todos = await this.studyTasksService.getToDos();
    const taskAvailable = todos.some((t) => t.task_id === this.task_id);
    if (!taskAvailable) {
      await this.showToast('This task had a time limit and is no longer available.', 'bottom');
      this.navController.navigateRoot('/');
      return;
    }

    this.survey = (await this.storage.getModuleByID(task.uuid)).params as Survey;

    if (this.survey.shuffle) {
      this.survey.sections = this.shuffle(this.survey.sections);
    }
    for (const section of this.survey.sections) {
      if (section.shuffle) {
        section.questions = this.shuffle(section.questions);
      }
    }

    this.sectionName = this.survey.sections[this.sectionIndex].name;

    const uuid = await this.storage.getUuid();
    this.setupQuestionVariables(uuid.toString());

    const randomGroups: { [rand_group: string]: string[] } = {};
    for (const section of this.survey.sections) {
      for (const question of section.questions) {
        if (question.rand_group) {
          question.noToggle = true;
          (randomGroups[question.rand_group] ||= []).push(question.id);
        }
      }
    }
    const showThese: string[] = [];
    for (const key of Object.keys(randomGroups)) {
      const arr = randomGroups[key];
      showThese.push(arr[Math.floor(Math.random() * arr.length)]);
    }
    for (const section of this.survey.sections) {
      for (const question of section.questions) {
        if (showThese.includes(question.id)) {
          question.noToggle = false;
          question.response = 1;
        } else if (question.noToggle) {
          question.hidden = true;
          delete (question as any).hide_id;
          delete (question as any).hide_value;
          delete (question as any).hide_if;
        }
      }
    }

    for (const section of this.survey.sections) {
      for (const question of section.questions) {
        this.toggleDynamicQuestions(question);
      }
    }

    SplashScreen.hide();
  }

  back() {
    if (this.sectionIndex > 0) {
      this.ngZone.run(() => {
        this.sectionIndex--;
        this.sectionName = this.survey.sections[this.sectionIndex].name;
      });
    } else {
      this.navController.navigateRoot('/');
    }
  }

  setupQuestionVariables(uuid: string) {
    if (!this.survey.sections) return;

    for (const section of this.survey.sections) {
      for (const question of section.questions) {
        question.response = '';
        question.model = '';
        question.hideError = true;
        question.hidden = false;

        if (question.type === 'datetime') {
          question.model = moment().format();
        } else if (
          question.type === 'media' &&
          (question.subtype === 'audio' || question.subtype === 'video')
        ) {
          question.safeurl = this.domSanitizer.bypassSecurityTrustResourceUrl(
            (question as any).src
          );
          if (question.subtype === 'video') {
            (question as any).safethumb =
              this.domSanitizer.bypassSecurityTrustResourceUrl((question as any).thumb);
          }
        } else if (question.type === 'slider') {
          const min = (question as any).min;
          const max = (question as any).max;
          const model = min + (max - min) / 2;
          question.model = model;
          (question as any).value = model;
        } else if (question.type === 'multi') {
          const enriched: any[] = [];
          let i = 0;
          for (const raw of (question as any).options || []) {
            i += 1;
            enriched.push(this.normalizeOption(String(raw), i));
          }
          (question as any).optionsChecked = enriched;

          if ((question as any).shuffle) {
            (question as any).optionsChecked = this.shuffle((question as any).optionsChecked);
          }

          if (!(question as any).radio) {
            question.response = '';
          }
        }
      }
    }
  }

  /**
   * Returns true if the given question represents the participant ID field.
   * This is currently detected by a combination of role and known IDs.
   */
  private isParticipantIdQuestion(question: Question): boolean {
    return (
      (question as any).role === 'participant_id' ||
      question.id === '7uslb44zkd7bybb6' ||
      question.id === 'participant_id_7uslb4' ||
      question.id === 'participant_id_p2' ||
      question.id === 'participant_id_p1'
    );
  }

  setAnswer(question: Question) {
    let answer = question.model;
    question.errorMessage = '';

    // Handle numeric text questions, including participant ID.
    if (
      question.type === 'text' &&
      (question as TextQuestion).subtype === 'numeric'
    ) {
      const q = question as TextQuestion;
      const raw = (answer ?? '').toString().trim();

      // Reject empty input.
      if (raw === '') {
        question.errorMessage = 'Please enter a number.';
        question.response = '';
        question.hideError = false;
        return;
      }

      // Reject non-digit input, preserve leading zeros for valid values.
      if (!/^\d+$/.test(raw)) {
        question.errorMessage = 'Please enter digits only.';
        question.response = '';
        question.hideError = false;
        return;
      }

      // Participant ID must be exactly three digits (e.g. 001–999).
      if (this.isParticipantIdQuestion(question) && raw.length !== 3) {
        question.errorMessage = 'Your participant ID must be exactly 3 digits (e.g. 001).';
        question.response = '';
        question.hideError = false;
        return;
      }

      // Numeric bounds check; value is numeric, but original string is preserved.
      const v = Number(raw);

      if (q.min_value != null && v < q.min_value) {
        question.errorMessage = `Value must be ≥ ${q.min_value}.`;
        question.response = '';
        question.hideError = false;
        return;
      }

      if (q.max_value != null && v > q.max_value) {
        question.errorMessage = `Value must be ≤ ${q.max_value}.`;
        question.response = '';
        question.hideError = false;
        return;
      }

      // All checks passed; keep the raw string (e.g. "001").
      answer = raw;
    }

    // Store valid value.
    question.model = answer;
    question.response = answer;
    question.hideError = true;

    // Re-evaluate dynamic question visibility.
    this.toggleDynamicQuestions(question);
  }

  changeCheckStatus(option: any, question: Question) {
    const current = (question.response || '')
      .toString()
      .split(';')
      .map((s) => s.trim())
      .filter(Boolean);

    const code = option.code as string;
    const idx = current.indexOf(code);
    if (idx >= 0) {
      current.splice(idx, 1);
    } else {
      current.push(code);
    }

    question.response = current.join(';');
    question.hideError = true;
  }

  async takePhoto(question: any) {
    try {
      const savedPhoto = await this.photoService.takePhoto();
      if (savedPhoto) {
        question.model = 'data:image/jpeg;base64,' + savedPhoto.base64String;
        this.setAnswer(question);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  }

  async deletePhoto(question: any) {
    this.photoService.deletePhoto(question);
  }

  openExternalFile(url: string) {
    if (Capacitor.isNativePlatform()) {
      Browser.open({ url, windowName: '_system' }).catch((e) => {
        console.log('Browser.open() threw: ', e);
      });
    } else {
      window.open(url, '_blank');
    }
  }

  toggleDynamicQuestions(question: Question) {
    for (const section of this.survey.sections) {
      for (const q of section.questions) {
        if ((q as any).hide_id === question.id) {
          if ((((q as any).hide_value === question.response) as any) === (q as any).hide_if) {
            this.hideQuestion(q);
          } else {
            q.hidden = false;
            this.toggleDynamicQuestions(q);
          }
        }
      }
    }
  }

  private async confirmParticipantId(question: Question): Promise<boolean> {
    const enteredId = (question.response || question.model || '').toString().trim();

    const message = enteredId
      ? `Please check that your participant ID is correct: ${enteredId}`
      : 'Please check that your participant ID is correct.';

    const alert = await this.alertController.create({
      header: 'Confirm your ID',
      message,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          role: 'confirm',
        },
      ],
      backdropDismiss: false,
    });

    await alert.present();
    const result = await alert.onDidDismiss();
    return result.role === 'confirm';
  }

  // --- Start tomorrow notice ---
  private async showStartTomorrowNotice(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Thank you',
      message: 'The questions will start tomorrow for 7 days.',
      buttons: ['OK'],
      backdropDismiss: false,
    });

    await alert.present();
    await alert.onDidDismiss();
  }
  // --- End tomorrow notice ---

  private async showPostConfirmMessage(question: Question): Promise<void> {
    const message =
      question.post_confirm_message ||
      'Your questions will start tomorrow for 7 days.';

    const infoAlert = await this.alertController.create({
      header: 'Thank you',
      message,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
        },
      ],
      backdropDismiss: false,
    });

    await infoAlert.present();
    await infoAlert.onDidDismiss();
  }

  async submit() {
    const valid = !this.checkErrors();
    if (!valid) {
      this.content.scrollToTop(500);
      await this.showToast('You must answer all required (*) questions', 'bottom');
      return;
    }

    const lastSection = this.sectionIndex + 1 === this.survey.sections.length;

    if (!lastSection) {
      this.ngZone.run(() => {
        this.sectionIndex++;
        this.sectionName = this.survey.sections[this.sectionIndex].name;
        this.content.scrollToTop(0);
      });
      return;
    }

    let participantIdQuestion: Question | null = null;
    for (const section of this.survey.sections) {
      for (const q of section.questions) {
        if (this.isParticipantIdQuestion(q)) {
          participantIdQuestion = q;
          break;
        }
      }
      if (participantIdQuestion) break;
    }

    if (participantIdQuestion) {
      const confirmed = await this.confirmParticipantId(participantIdQuestion);
      if (!confirmed) {
        return;
      }
      await this.showStartTomorrowNotice();
    }

    await this.completeSurveyAndSend();
  }

  private async completeSurveyAndSend() {
    const task = await this.storage.getTaskByID(this.task_id);
    task.alert_time = moment(new Date(task.time).toISOString()).format();

    const response_time = moment().format();
    task.response_time = response_time;

    const response_time_ms = moment().valueOf();
    task.response_time_ms = response_time_ms;

    task.completed = true;

    const responses: SurveyResponse = {};
    for (const section of this.survey.sections) {
      for (const question of section.questions) {
        responses[question.id] = question.response;
      }
    }
    task.responses = responses;

    const response: Response = {
      module_index: task.index,
      module_name: task.name,
      alert_time: task.alert_time,
      response_time,
      response_time_in_ms: response_time_ms,
      data: responses,
    };
    await this.surveyDataService.sendResponse(response, 'survey_response');

    await this.storage.saveTask(task);
    this.navController.navigateRoot('/');
  }

  checkErrors(): boolean {
    const currentQuestions = this.survey.sections[this.sectionIndex].questions;
    let errorCount = 0;
    for (const question of currentQuestions) {
      const isIgnorable = question.type === 'instruction' || question.type === 'media';
      const missing = question.response === '' || question.response === undefined;
      const error = question.required && !question.hidden && !isIgnorable && missing;

      if (error) {
        question.hideError = false;
        errorCount++;
      } else {
        question.hideError = true;
      }
    }
    return errorCount !== 0;
  }

  async showToast(message: string, position?: 'top' | 'bottom' | 'middle') {
    const toast = await this.toastController.create({
      message,
      position,
      keyboardClose: true,
      color: 'danger',
      buttons: [{ text: 'Dismiss', role: 'cancel' }],
    });
    try {
      await toast.present();
    } catch {}
  }

  hideQuestion(question: Question) {
    question.hidden = true;
    for (const section of this.survey.sections) {
      for (const q of section.questions) {
        if ((q as any).hide_id === question.id) {
          this.hideQuestion(q);
        }
      }
    }
  }

  shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length;
    while (currentIndex) {
      const randomIndex = Math.floor(Math.random() * currentIndex--);
      const tmp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = tmp as T;
    }
    return array;
  }
}