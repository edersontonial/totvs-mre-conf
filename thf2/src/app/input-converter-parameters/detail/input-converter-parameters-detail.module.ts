import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoModule, PoI18nPipe } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { InputConverterParametersService } from '../../shared/services/input-converter-parameters.service';
import { InputConverterParametersModule } from '../components/input-converter-parameters.module';
import { LoadingInterceptorModule } from '../../loading-interceptor.module';
import { InputConverterParametersDetailRoutingModule } from './input-converter-parameters-detail-routing.module';
import { InputConverterParametersDetailComponent } from './input-converter-parameters-detail.component';


@NgModule({
  imports: [
    CommonModule,
    InputConverterParametersDetailRoutingModule,
    LoadingInterceptorModule,
    PoModule,
    FormsModule,
    InputConverterParametersModule
  ],
  declarations: [
    InputConverterParametersDetailComponent,
  ],
  providers: [
      PoI18nPipe,
      InputConverterParametersService
  ],
})
export class InputConverterParametersDetailModule { }
