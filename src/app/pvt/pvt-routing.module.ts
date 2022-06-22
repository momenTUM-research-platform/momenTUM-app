import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PvtPage } from './pvt.page';

const routes: Routes = [
  {
    path: '',
    component: PvtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PvtPageRoutingModule {}
