import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoModule, PoI18nPipe } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { InputConverterParametersService } from '../../shared/services/input-converter-parameters.service';
import { InputConverterParametersEditRoutingModule } from './input-converter-parameters-edit-routing.module';
import { InputConverterParametersEditComponent } from './input-converter-parameters-edit.component';
import { InputConverterParametersModule } from '../components/input-converter-parameters.module';
import { LoadingInterceptorModule } from '../../loading-interceptor.module';


@NgModule({
  imports: [
    CommonModule,
    InputConverterParametersEditRoutingModule,
    LoadingInterceptorModule,
    PoModule,
    FormsModule,
    InputConverterParametersModule
  ],
  declarations: [
    InputConverterParametersEditComponent,
  ],
  providers: [
      PoI18nPipe,
      InputConverterParametersService
  ],
})
export class InputConverterParametersEditModule { }
