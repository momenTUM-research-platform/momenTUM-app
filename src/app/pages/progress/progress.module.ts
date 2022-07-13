import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProgressPageRoutingModule } from './progress-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressPage } from './progress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    ProgressPageRoutingModule
  ],
  declarations: [ProgressPage]
})
export class ProgressPageModule {}
