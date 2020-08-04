import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PoModule, PoI18nPipe } from '@po-ui/ng-components';

import { ManifestationParametersService } from '../shared/services/manifestation-parameters.service';
import { ManifestationParametersRoutingModule } from './manifestation-parameters-routing.module';

import { LoadingInterceptorModule } from '../loading-interceptor.module';
import { ManifestationParametersListComponent } from './list/manifestation-parameters.list.component';
import { ManifestationParametersEditComponent } from './edit/manifestation-parameters.edit.component';
import { EstablishmentsPublicService } from '../shared/services/establishments-public.service';


@NgModule({
    imports: [
        CommonModule,
        LoadingInterceptorModule,
        PoModule,
        FormsModule,
        HttpClientModule,
        ManifestationParametersRoutingModule
    ],
    declarations: [
        ManifestationParametersListComponent,
        ManifestationParametersEditComponent
    ],
    exports: [
        ManifestationParametersListComponent
    ],
    providers: [
        PoI18nPipe,
        ManifestationParametersService,
        EstablishmentsPublicService
    ],
})
export class ManifestationParametersModule { }

