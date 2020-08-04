import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PoModule, PoI18nConfig, PoI18nModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { generalEn } from './shared/literals/i18n/general-en';
import { generalEs } from './shared/literals/i18n/general-es';
import { generalPt } from './shared/literals/i18n/general-pt';
import { receivingParametersPt } from './shared/literals/i18n/receiving-parameters-pt';
import { receivingParametersEn } from './shared/literals/i18n/receiving-parameters-en';
import { receivingParametersEs } from './shared/literals/i18n/receiving-parameters-es';
import { inputConverterParametersPt } from './shared/literals/i18n/input-converter-parameters-pt';
import { inputConverterParametersEn } from './shared/literals/i18n/input-converter-parameters-en';
import { inputConverterParametersEs } from './shared/literals/i18n/input-converter-parameters-es';
import { manifestationParametersPt } from './shared/literals/i18n/manifestation-parameters-pt';
import { manifestationParametersEs } from './shared/literals/i18n/manifestation-parameters-es';
import { manifestationParametersEn } from './shared/literals/i18n/manifestation-parameters-en';
import { ParameterCenterService } from './shared/services/parameter-center.service';
import { LoadingInterceptorModule } from './loading-interceptor.module';
import { receivingFamilyPt } from './shared/literals/i18n/receiving-family-pt';
import { receivingFamilyEn } from './shared/literals/i18n/receiving-family-en';
import { receivingFamilyEs } from './shared/literals/i18n/receiving-family-es';
import { parametersSiteFamilyPt } from './shared/literals/i18n/parameters-site-family-pt';
import { parametersSiteFamilyEn } from './shared/literals/i18n/parameters-site-family-en';
import { parametersSiteFamilyEs } from './shared/literals/i18n/parameters-site-family-es';
import { parametersSiteItemPt } from './shared/literals/i18n/parameters-site-item-pt';
import { parametersSiteItemEn } from './shared/literals/i18n/parameters-site-item-en';
import { parametersSiteItemEs } from './shared/literals/i18n/parameters-site-item-es';
import { receivingItemPt } from './shared/literals/i18n/receiving-item-pt';
import { receivingItemEn } from './shared/literals/i18n/receiving-item-en';
import { receivingItemEs } from './shared/literals/i18n/receiving-item-es';
import { replicationDataPt } from './shared/literals/i18n/replication-data-pt';
import { replicationDataEn } from './shared/literals/i18n/replication-data-en';
import { replicationDataEs } from './shared/literals/i18n/replication-data-es';

const i18nConfig: PoI18nConfig = {
    default: {
        context: 'general',
        cache: true,
        language: 'pt-BR'
    },
    contexts: {
        general: {
            'pt-BR': generalPt,
            'en-US': generalEn,
            'es': generalEs
        },
        receivingParameters: {
            'pt-BR': receivingParametersPt,
            'en-US': receivingParametersEn,
            'es': receivingParametersEs
        },
        inputConverterParameters: {
            'pt-BR': inputConverterParametersPt,
            'en-US': inputConverterParametersEn,
            'es': inputConverterParametersEs
        },
        manifestationParameters: {
            'pt-BR': manifestationParametersPt,
            'en-US': manifestationParametersEn,
            'es': manifestationParametersEs
        },
        receivingFamily: {
            'pt-BR': receivingFamilyPt,
            'en-US': receivingFamilyEn,
            'es': receivingFamilyEs
        },
        parametersSiteFamily: {
            'pt-BR': parametersSiteFamilyPt,
            'en-US': parametersSiteFamilyEn,
            'es': parametersSiteFamilyEs
        },
        parametersSiteItem: {
            'pt-BR': parametersSiteItemPt,
            'en-US': parametersSiteItemEn,
            'es': parametersSiteItemEs
        },
        receivingItem: {
            'pt-BR': receivingItemPt,
            'en-US': receivingItemEn,
            'es': receivingItemEs
        },
        replicationData: {
            'pt-BR': replicationDataPt,
            'en-US': replicationDataEn,
            'es': replicationDataEs
        }
    }
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        LoadingInterceptorModule,
        PoModule,
        PoTemplatesModule,
        CommonModule,
        FormsModule,
        AppRoutingModule,
        PoI18nModule.config(i18nConfig)
    ],
    providers: [
        ParameterCenterService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
