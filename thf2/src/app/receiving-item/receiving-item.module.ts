import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PoModule, PoI18nPipe } from '@po-ui/ng-components';

import { ReceivingItemService } from '../shared/services/receiving-item.service';
import { ReceivingItemEditComponent } from './edit/receiving-item.edit.component';
import { ReceivingItemListComponent } from './list/receiving-item.list.component';
import { ReceivingItemRoutingModule } from './receiving-item-routing.module';

import { LoadingInterceptorModule } from '../loading-interceptor.module';
import { TaxClassificationService } from '../shared/services/tax-classification.services';
import { TaxFamilyService } from '../shared/services/tax-family.services';
import { TaxServiceInssService } from '../shared/services/tax-service-inss.services';
import { IncomeNatureService } from '../shared/services/income-nautre.services';
import { IcmsTaxCodeDayService } from '../shared/services/icms-tax-code-day.services';
import { ParametersSiteItemService } from '../shared/services/parameters-site-item.service';
import { TaxTypeService } from '../shared/services/tax-type.services';
import { UnityMeasuresService } from '../shared/services/unity-measures.services';

@NgModule({
    imports: [
        CommonModule,
        LoadingInterceptorModule,
        PoModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ReceivingItemRoutingModule
    ],
    declarations: [
        ReceivingItemListComponent,
        ReceivingItemEditComponent
    ],
    exports: [
        ReceivingItemListComponent
    ],
    providers: [
        PoI18nPipe,
        ReceivingItemService,
        ParametersSiteItemService,
        TaxClassificationService,
        TaxFamilyService,
        TaxServiceInssService,
        IncomeNatureService,
        IcmsTaxCodeDayService,
        TaxTypeService,
        UnityMeasuresService
    ],
})
export class ReceivingItemModule { }

