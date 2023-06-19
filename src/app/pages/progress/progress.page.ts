import { Component } from '@angular/core';
import * as moment from 'moment';
import { DataService } from '../../services/data/data.service';
import { StudyTasksService } from '../../services/study-tasks/study-tasks.service';
import { TranslateConfigService } from '../../translate-config.service';
import { StorageService } from '../../services/storage/storage.service';
import { Study } from 'src/app/interfaces/study';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage {
  // array to store the graphs
  graphs: Array<any> = new Array();

  // array to store the history
  history: Array<any> = new Array();

  // flag for study enrolment
  enrolledInStudy = false;

  // study object JSON
  study: Study;

  // current study day
  studyDay: number;

  // the current language of the device
  selectedLanguage: string;

  // graph options
  chartOptions: any = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      xAxes: [
        {
          ticks: {
            fontSize: 6,
          },
          barThickness: 20,
        },
      ],
      yAxes: [
        {
          ticks: {
            fontSize: 8,
            beginAtZero: true,
          },
        },
      ],
    },
  };

  // graph colours
  chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(4,153,139,0.6)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
    {
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
    },
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
  ];

  constructor(
    private storage: StorageService,
    private studyTasksService: StudyTasksService,
    private surveyDataService: DataService,
    private translateConfigService: TranslateConfigService
  ) {
    // get the default language of the device
    this.selectedLanguage =
      this.translateConfigService.getDefaultLanguage() || 'en';
  }

  async ionViewWillEnter() {
    this.graphs = [];
    this.history = [];
    this.enrolledInStudy = false;

    this.study = await this.storage.getStudy();
    const enrolmentDate = await this.storage.getEnrolmentDate();
    if (this.study !== null) {
      this.enrolledInStudy = true;

      // calculate the study day
      this.studyDay = this.diffDays(
        new Date(enrolmentDate.toString()),
        new Date()
      );

      // log the user visiting this tab
      this.surveyDataService.sendLog({
        timestamp: moment().format(),
        page: 'my-progress',
        event: 'entry',
      });

      const tasks = await this.storage.getTasks();
      // get all entries for history
      for (const task of tasks) {
        if (task.completed && task.response_time) {
          const historyItem = {
            task_name: task.name.replace(/<\/?[^>]+(>|$)/g, ''),
            moment_time: moment(new Date(task.response_time)).fromNow(), //format("Do MMM, YYYY").fromNow()
            response_time: new Date(task.response_time),
          };
          this.history.unshift(historyItem);
        }
      }
      // sort the history array by completion time
      this.history.sort((x, y) => x.resonse_time - y.response_time);

      // get all graphs
      for (const module of this.study.modules) {
        const graph = module.graph;
        const study_name = module.name;
        const graph_header = module.name;

        // if the module is to display a graph
        if (graph.display) {
          // get the variable to graph
          const variableToGraph = graph.variable;

          // store the labels and data for this module
          const task_labels = [];
          const task_data = [];

          const graph_title = graph.title;
          const graph_blurb = graph.blurb;
          const graph_type = graph.type;
          const graph_maxpoints = -graph.max_points;

          // loop through each study_task
          for (const task of tasks) {
            // check if the task is this task
            if (task.name === study_name && task.completed && task.responses) {
              // get the variable we are to graph
              for (const k in task.responses) {
                if (k === variableToGraph) {
                  // format the response time
                  const response_time = moment(
                    new Date(task.response_time)
                  ).format('MMM Do, h:mma');
                  task_labels.push(response_time);
                  task_data.push(task.responses[k]);
                  break;
                }
              }
            }
          }

          // create a new graph object
          const graphObj = {
            data: [
              {
                data: task_data.slice(graph_maxpoints),
                label: graph_title,
              },
            ],
            labels: task_labels.slice(graph_maxpoints),
            options: this.chartOptions,
            colors: this.chartColors,
            legend: graph_title,
            type: graph_type,
            blurb: graph_blurb,
            header: graph_header,
          };

          // if the task had any data to graph, push it
          if (task_data.length > 0) {
            this.graphs.push(graphObj);
          }
        }
      }
    }
  }

  diffDays(d1: Date, d2: Date) {
    let ndays = 0;
    const tv1 = d1.valueOf(); // msec since 1970
    const tv2 = d2.valueOf();

    ndays = (tv2 - tv1) / 1000 / 86400;
    ndays = Math.round(ndays - 0.5);
    return ndays;
  }

  async ionViewWillLeave() {
    if (this.enrolledInStudy) {
      this.surveyDataService.sendLog({
        timestamp: moment().format(),
        page: 'my-progress',
        event: 'exit',
      });
    }
  }
}
