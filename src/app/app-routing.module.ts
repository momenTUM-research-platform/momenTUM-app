import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'survey/:task_id',
    loadChildren: () => import('./survey/survey.module').then(m => m.SurveyPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'pvt',
    loadChildren: () => import('./pvt/pvt.module').then( m => m.PvtPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
