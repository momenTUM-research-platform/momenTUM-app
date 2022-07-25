import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyPage } from './survey.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyPageRoutingModule {}
