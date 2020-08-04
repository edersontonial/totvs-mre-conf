import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PoModule } from '@po-ui/ng-components';

import { ParametersSiteFamilyEditComponent } from './edit/parameters-site-family.edit.component';

import { LoadingInterceptorModule } from '../loading-interceptor.module';
import { ParametersSiteFamilyRoutingModule } from './parameters-site-family-routing.module';
import { ParametersSiteFamilyListComponent } from './list/parameters-site-family.list.component';
import { ParametersSiteFamilyService } from '../shared/services/parameter-site-family.service';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        LoadingInterceptorModule,
        PoModule,
        FormsModule,
        HttpClientModule,
        ParametersSiteFamilyRoutingModule
    ],
    declarations: [
        ParametersSiteFamilyListComponent,
        ParametersSiteFamilyEditComponent
    ],
    exports: [
        ParametersSiteFamilyListComponent
    ],
    providers: [
        ParametersSiteFamilyService
    ],
})
export class ParametersSiteFamilyModule { }

