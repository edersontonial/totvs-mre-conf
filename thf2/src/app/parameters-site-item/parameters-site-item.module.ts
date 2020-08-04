import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PoModule, PoI18nPipe } from '@po-ui/ng-components';


import { ParametersSiteItemService } from '../shared/services/parameters-site-item.service';
import { ParametersSiteItemEditComponent } from './edit/parameters-site-item.edit.component';
import { ParametersSiteItemRoutingModule } from './parameters-site-item-routing.module';

import { LoadingInterceptorModule } from '../loading-interceptor.module';
import { ParametersSiteItemListComponent } from './list/parameters-site-item.list.component';

@NgModule({
    imports: [
        CommonModule,
        LoadingInterceptorModule,
        PoModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ParametersSiteItemRoutingModule
    ],
    declarations: [
        ParametersSiteItemListComponent,
        ParametersSiteItemEditComponent
    ],
    exports: [
        ParametersSiteItemListComponent
    ],
    providers: [
        PoI18nPipe,
        ParametersSiteItemService
    ],
})
export class ParametersSiteItemModule { }

