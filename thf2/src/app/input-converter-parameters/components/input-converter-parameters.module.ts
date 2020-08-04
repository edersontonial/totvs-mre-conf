import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoModule, PoI18nPipe } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { LoadingInterceptorModule } from '../../loading-interceptor.module';
import { InputConverterParametersService } from '../../shared/services/input-converter-parameters.service';
import { InputConverterParametersComponent } from './input-converter-parameters.component';

@NgModule({
  imports: [
    CommonModule,
    LoadingInterceptorModule,
    PoModule,
    FormsModule
  ],
  declarations: [
    InputConverterParametersComponent
  ],
  exports: [
    InputConverterParametersComponent
  ],
  providers: [
    PoI18nPipe,
    InputConverterParametersService
  ],
})
export class InputConverterParametersModule { }
