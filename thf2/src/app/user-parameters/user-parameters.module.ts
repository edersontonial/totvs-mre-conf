import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoModule, PoI18nPipe } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { LoadingInterceptorModule } from '../loading-interceptor.module';
import { UserParametersListComponent } from './list/user-parameters-list.component';
import { UserParametersRoutingModule } from './user-parameters-routing.module';
import { UserParametersService } from '../shared/services/user-parameters.service';
import { UserParametersEditComponent } from './edit/user-parameters-edit.component';
import { PoTemplatesModule } from '@po-ui/ng-templates';


@NgModule({
  imports: [
    CommonModule,
    UserParametersRoutingModule,
    LoadingInterceptorModule,
    PoModule,
    PoTemplatesModule,
    FormsModule,
  ],
  declarations: [
    UserParametersListComponent,
    UserParametersEditComponent
  ],
  providers: [
    PoI18nPipe,
    UserParametersService
  ],
})
export class UserParametersModule { }
