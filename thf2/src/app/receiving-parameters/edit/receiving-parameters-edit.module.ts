import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoModule, PoI18nPipe } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { ReceivingParametersService } from '../../shared/services/receiving-parameters.service';
import { ReceivingParametersEditRoutingModule } from './receiving-parameters-edit-routing.module';
import { ReceivingParametersEditComponent } from './receiving-parameters-edit.component';
import { ReceivingParametersModule } from '../components/receiving-parameters.module';
import { LoadingInterceptorModule } from '../../loading-interceptor.module';


@NgModule({
  imports: [
    CommonModule,
    ReceivingParametersEditRoutingModule,
    LoadingInterceptorModule,
    PoModule,
    FormsModule,
    ReceivingParametersModule
  ],
  declarations: [
    ReceivingParametersEditComponent,
  ],
  providers: [
      PoI18nPipe,
      ReceivingParametersService
  ],
})
export class ReceivingParametersEditModule { }
