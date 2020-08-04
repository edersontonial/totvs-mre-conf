import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoModule, PoI18nPipe } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { ReceivingParametersService } from '../../shared/services/receiving-parameters.service';
import { ReceivingParametersModule } from '../components/receiving-parameters.module';
import { LoadingInterceptorModule } from '../../loading-interceptor.module';
import { ReceivingParametersDetailRoutingModule } from './receiving-parameters-detail-routing.module';
import { ReceivingParametersDetailComponent } from './receiving-parameters-detail.component';


@NgModule({
  imports: [
    CommonModule,
    ReceivingParametersDetailRoutingModule,
    LoadingInterceptorModule,
    PoModule,
    FormsModule,
    ReceivingParametersModule
  ],
  declarations: [
    ReceivingParametersDetailComponent,
  ],
  providers: [
      PoI18nPipe,
      ReceivingParametersService
  ],
})
export class ReceivingParametersDetailModule { }
