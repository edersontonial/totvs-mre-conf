import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceivingParametersComponent } from './receiving-parameters.component';
import { PoModule, PoI18nPipe } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { ReceivingParametersService } from '../../shared/services/receiving-parameters.service';
import { LoadingInterceptorModule } from '../../loading-interceptor.module';
import { SeriesService } from '../../shared/services/series.service';


@NgModule({
  imports: [
    CommonModule,
    LoadingInterceptorModule,
    PoModule,
    FormsModule
  ],
  declarations: [
    ReceivingParametersComponent
  ],
  exports: [
    ReceivingParametersComponent
  ],
  providers: [
    PoI18nPipe,
    ReceivingParametersService,
    SeriesService
  ],
})
export class ReceivingParametersModule { }
