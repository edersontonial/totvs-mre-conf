import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PoModule, PoI18nPipe } from '@po-ui/ng-components';

import { ReceivingFamilyService } from '../shared/services/receiving-family.service';
import { ReceivingFamilyEditComponent } from './edit/receiving-family.edit.component';

import { ReceivingFamilyRoutingModule } from './receiving-family-routing.module';

import { LoadingInterceptorModule } from '../loading-interceptor.module';
import { ReceivingFamilyListComponent } from './list/receiving-family.list.component';
import { TaxClassificationService } from '../shared/services/tax-classification.services';
import { TaxFamilyService } from '../shared/services/tax-family.services';
import { TaxTypeService } from '../shared/services/tax-type.services';
import { ParametersSiteFamilyService } from '../shared/services/parameter-site-family.service';
import { ReplicationDataFamilyService } from '../shared/services/replication-data-family.service';

@NgModule({
    imports: [
        CommonModule,
        LoadingInterceptorModule,
        PoModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ReceivingFamilyRoutingModule
    ],
    declarations: [
        ReceivingFamilyListComponent,
        ReceivingFamilyEditComponent
    ],
    exports: [
        ReceivingFamilyListComponent
    ],
    providers: [
        PoI18nPipe,
        ReceivingFamilyService,
        ParametersSiteFamilyService,
        TaxClassificationService,
        TaxFamilyService,
        TaxTypeService,
        ReplicationDataFamilyService
    ],
})
export class ReceivingFamilyModule { }

