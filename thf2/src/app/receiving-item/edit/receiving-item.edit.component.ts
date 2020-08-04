import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import {
    PoBreadcrumb,
    PoPageAction,
    PoI18nService,
    PoI18nPipe,
    PoNotificationService,
    PoTableColumn,
    PoLookupColumn,
    PoSelectOption,
    PoRadioGroupOption,
    PoAccordionItemComponent
} from '@po-ui/ng-components';

import { IReceivingItem, ReceivingItem } from '../../shared/model/receiving-item.model';
import { ReceivingItemService } from '../../shared/services/receiving-item.service';
import { IParametersSiteItem } from '../../shared/model/parameters-site-item.model';
import { TotvsResponse } from 'dts-backoffice-util';
import { TaxClassificationService } from '../../shared/services/tax-classification.services';
import { ITaxClassification } from '../../shared/model/tax-classification.model';
import { ITaxFamily } from '../../shared/model/tax-family.model';
import { TaxFamilyService } from '../../shared/services/tax-family.services';
import { ITaxServiceInss } from '../../shared/model/tax-service-inss.model';
import { TaxServiceInssService } from '../../shared/services/tax-service-inss.services';
import { IncomeNatureService } from '../../shared/services/income-nautre.services';
import { IIncomeNature } from '../../shared/model/income-nature.model';
import { IIcmsTaxCodeDay } from '../../shared/model/icms-tax-code-day.model';
import { IcmsTaxCodeDayService } from '../../shared/services/icms-tax-code-day.services';
import { ParametersSiteItemService } from '../../shared/services/parameters-site-item.service';
import { ITaxType } from '../../shared/model/tax-type.model';
import { TaxTypeService } from '../../shared/services/tax-type.services';
import { UnityMeasuresService } from '../../shared/services/unity-measures.services';
import { IUnityMeasures } from 'src/app/shared/model/unity-measures.model';

@Component({
    selector: 'app-edit',
    templateUrl: './receiving-item.edit.component.html',
    styleUrls: ['./receiving-item.edit.component.css']
})
export class ReceivingItemEditComponent implements OnInit, OnDestroy {

    @ViewChild('variation', { static: true }) variation: PoAccordionItemComponent;

    detailBreadcrumb: PoBreadcrumb;
    editBreadcrumb: PoBreadcrumb;
    detailActions: Array<PoPageAction>;
    editActions: Array<PoPageAction>;

    isPageEdit: boolean;
    receivingItem: IReceivingItem = ReceivingItem.empty();
    itemCode: string;
    itemDesc: string;

    literals: any = {};

    hasNext = false;
    pageSize = 20;
    currentPage = 0;
    isLoading = true;

    thousandMaxLengthRate = 2;
    thousandMaxLengthValueUnit = 4;
    thousandMaxLengthReduct = 3;
    thousandMaxLengthSubst = 10;

    decimalRate = 4;
    decimalValueUnit = 5;
    decimalsLengthReduct = 2;
    decimalsLengthSubst = 4;

    parametersSiteItems: Array<IParametersSiteItem> = new Array<IParametersSiteItem>();
    items: Array<IParametersSiteItem> = new Array<IParametersSiteItem>();
    columnsDetail: Array<PoTableColumn>;
    columns: Array<PoTableColumn>;

    metadados: any;
    optionsIcms: Array<PoSelectOption> = [];
    optionsIpi: Array<PoSelectOption> = [];
    optionsIss: Array<PoSelectOption> = [];
    optionsProductGeneral: Array<PoSelectOption> = [];
    optionsOrigin: Array<PoRadioGroupOption> = [];
    optionsItemType: Array<PoSelectOption> = [];
    optionsRecyclableItem: Array<PoSelectOption> = [];


    zoomClassifColumns: Array<PoLookupColumn>;
    zoomIpiFamilyColumns: Array<PoLookupColumn>;
    zoomTaxServiceInssColumns: Array<PoLookupColumn>;
    zoomIncomeNaturColumns: Array<PoLookupColumn>;
    zoomTaxCodeColumns: Array<PoLookupColumn>;
    zoomTaxTypeColumns: Array<PoLookupColumn>;
    zoomUnitMeasurementColumns: Array<PoLookupColumn>;

    taxClassificationDesc: string;
    taxServiceInssDesc: string;
    taxCodeDesc: string;
    taxServiceDesc: string;
    rfTaxationDesc: string;
    taxFamilyDesc: string;
    descriptionNature: string;
    codeTaxIcmsDesc: string;
    taxTypeDesc: string;
    unitMeasurementRecyclableItemDesc: string;
    codeTaxIvaDesc: string;

    receivingItemSubscription$: Subscription;
    classifSubscription$: Subscription;
    taxFamilySubscription$: Subscription;
    parametersSiteItemsSubscription$: Subscription;
    TaxServiceInssSubscription$: Subscription;
    incomeNatureSubscription$: Subscription;
    icmsTaxCodeDaySubscription$: Subscription;
    taxTypeSubscription$: Subscription;
    UnityMeasuresSubscription$: Subscription;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private poI18nPipe: PoI18nPipe,
        private poI18nService: PoI18nService,
        private poNotification: PoNotificationService,
        private serviceReceivingItem: ReceivingItemService,
        private parametersSiteItemService: ParametersSiteItemService,
        private serviceClassif: TaxClassificationService,
        private serviceTaxFamily: TaxFamilyService,
        private serviceTaxServiceInss: TaxServiceInssService,
        private serviceIncomeNature: IncomeNatureService,
        private serviceTaxCodeIcms: IcmsTaxCodeDayService,
        private serviceTaxType: TaxTypeService,
        private serviceUnityMeasures: UnityMeasuresService

    ) { }

    ngOnInit(): void {
        forkJoin([
            this.poI18nService.getLiterals(),
            this.poI18nService.getLiterals({ context: 'receivingItem' })
        ]).subscribe(literals => {
            literals.map(item => Object.assign(this.literals, item));
            this.setupComponents();
            this.get();
            this.variation.expand();
        });


    }
    private get() {
        if (this.activatedRoute.snapshot.paramMap.get('id') === '') {
            this.itemCode = '\'\'';
        } else {
            this.itemCode = this.activatedRoute.snapshot.paramMap.get('id');
        }
        this.searchMetadados(this.itemCode);

        if (this.itemCode) {

            if (this.activatedRoute.snapshot.url[0].path === 'detail') {
                this.isPageEdit = false;
            } else {
                this.isPageEdit = true;
            }

            this.receivingItemSubscription$ = this.serviceReceivingItem.getById(this.itemCode).subscribe((item: IReceivingItem) => {
                this.receivingItem = item;
                this.itemDesc = `${this.receivingItem.itemCode} - ${this.receivingItem.descriptionItem}`;
                this.search();
                if (this.activatedRoute.snapshot.url[0].path === 'detail') {
                    this.getDescriptionDetail(item);
                }
            });

        }
    }


    getDescriptionDetail(item: IReceivingItem): void {
        if (item.taxClassification != null && item.taxClassification !== undefined) {
            this.getClassif(item.taxClassification);
        } else {
            this.taxClassificationDesc = '';
        }

        if (item.taxServiceInss != null && item.taxServiceInss !== undefined) {
            this.getTaxServiceInss(Number(item.taxServiceInss));
        } else {
            this.taxServiceInssDesc = '';
        }

        if (item.incomeNature != null && item.incomeNature !== undefined) {
            this.getIncomeNatur(item.incomeNature);
        } else {
            this.descriptionNature = '';
        }
        if (item.taxCode != null && item.taxCode !== undefined) {
            this.getTaxCode(item.taxCode);
        } else {
            this.taxCodeDesc = '';
        }

        if (item.taxServiceCode != null && item.taxServiceCode !== undefined) {
            this.getTaxServiceCode(item.taxServiceCode);
        } else {
            this.taxServiceDesc = '';
        }
        if (item.rfTax != null && item.rfTax !== undefined) {
            this.getRfTaxation(item.rfTax);
        } else {
            this.rfTaxationDesc = '';
        }

        if (item.ipiFamily != null && item.ipiFamily !== undefined) {
            this.getTaxFamily(item.ipiFamily);
        } else {
            this.taxFamilyDesc = '';
        }
        if (item.codeTaxICMS != null && item.codeTaxICMS !== undefined) {
            this.getTaxCodeIcms(item.codeTaxICMS);
        } else {
            this.codeTaxIcmsDesc = '';
        }
        if (item.unitMeasurementRecyclableItem != null
            && item.unitMeasurementRecyclableItem !== undefined) {
            this.getUnityMeasures(item.unitMeasurementRecyclableItem);
        } else {
            this.unitMeasurementRecyclableItemDesc = '';
        }
        if (item.codeTaxIva != null && item.codeTaxIva !== undefined) {
            this.getTaxIva(item.codeTaxIva);
        } else {
            this.codeTaxIvaDesc = '';
        }
    }
    getClassif(taxClassification: string): void {
        this.classifSubscription$ = this.serviceClassif
            .getById(taxClassification)
            .subscribe((response: ITaxClassification) => {
                if (response.classifCode !== undefined) {
                    this.taxClassificationDesc = `${response.classifCode} - ${response.descriptionClassif}`;
                }
            }, (err: any) => {
                this.taxClassificationDesc = '';
            });
    }
    getTaxFamily(ipiFamily: string): void {

        this.taxFamilySubscription$ = this.serviceTaxFamily
            .getById(ipiFamily)
            .subscribe((response: ITaxFamily) => {
                if (response.taxFamilyCode !== undefined) {
                    this.taxFamilyDesc = `${response.taxFamilyCode} - ${response.taxFamilyDescription}`;
                }
            }, (err: any) => {
                this.taxFamilyDesc = '';
            });
    }
    getTaxServiceInss(inssServiceCode: number): void {

        this.TaxServiceInssSubscription$ = this.serviceTaxServiceInss
            .getById(inssServiceCode)
            .subscribe((response: ITaxServiceInss) => {
                if (response.inssServiceCode !== undefined) {
                    this.taxServiceInssDesc = `${response.inssServiceCode} - ${response.descriptionInssService}`;
                }
            }, (err: any) => {
                this.taxServiceInssDesc = '';
            });
    }
    getIncomeNatur(incomeNature: string): void {

        this.incomeNatureSubscription$ = this.serviceIncomeNature
            .getById(incomeNature)
            .subscribe((response: IIncomeNature) => {
                if (response.incomeNature !== undefined) {
                    this.descriptionNature = `${response.incomeNature} - ${response.descriptionNature}`;
                }
            }, (err: any) => {
                this.descriptionNature = '';
            });
    }

    getTaxServiceCode(taxServiceCode: number): void {
        this.taxTypeSubscription$ = this.serviceTaxType
            .getById(taxServiceCode)
            .subscribe((response: ITaxType) => {
                if (response.taxCode !== undefined) {
                    this.taxServiceDesc = `${response.taxCode} - ${response.taxDescription}`;
                }
            }, (err: any) => {
                this.taxServiceDesc = '';
            });
    }
    getTaxCode(taxCode: number): void {

        this.taxTypeSubscription$ = this.serviceTaxType
            .getById(taxCode)
            .subscribe((response: ITaxType) => {
                if (response.taxCode !== undefined) {
                    this.taxCodeDesc = `${response.taxCode} - ${response.taxDescription}`;
                }
            }, (err: any) => {
                this.taxCodeDesc = '';
            });
    }
    getTaxCodeIcms(taxCode: string): void {

        this.icmsTaxCodeDaySubscription$ = this.serviceTaxCodeIcms
            .getById(taxCode)
            .subscribe((response: IIcmsTaxCodeDay) => {
                if (response.taxCode !== undefined) {
                    this.codeTaxIcmsDesc = `${response.taxCode} - ${response.descriptionTaxCode}`;
                }
            }, (err: any) => {
                this.codeTaxIcmsDesc = '';
            });
    }
    getRfTaxation(rfTaxation: number): void {
        this.taxTypeSubscription$ = this.serviceTaxType
            .getById(rfTaxation)
            .subscribe((response: ITaxType) => {
                if (response.taxCode !== undefined) {
                    this.taxTypeDesc = `${response.taxCode} - ${response.taxDescription}`;
                }
            }, (err: any) => {
                this.taxTypeDesc = '';
            });
    }

    getUnityMeasures(code: string): void {
        this.UnityMeasuresSubscription$ = this.serviceUnityMeasures
            .getById(code)
            .subscribe((response: IUnityMeasures) => {
                if (response.code !== undefined) {
                    this.unitMeasurementRecyclableItemDesc = `${response.code} - ${response.description}`;
                }
            }, (err: any) => {
                this.unitMeasurementRecyclableItemDesc = '';
            });
    }
    getTaxIva(taxCode: number): void {
        this.taxTypeSubscription$ = this.serviceTaxType
            .getById(taxCode)
            .subscribe((response: ITaxType) => {
                if (response.taxCode !== undefined) {
                    this.codeTaxIvaDesc = `${response.taxCode} - ${response.taxDescription}`;
                }
            }, (err: any) => {
                this.codeTaxIvaDesc = '';
            });
    }
    searchMetadados(itemCode: string): void {

        this.receivingItemSubscription$ = this.serviceReceivingItem.getMetadados(itemCode).subscribe((metad: any) => {
            this.metadados = metad;
        });
    }

    private update() {

        this.receivingItemSubscription$ = this.serviceReceivingItem.update(this.receivingItem).subscribe(() => {
            this.router.navigate(['/receivingItem']);
            this.poNotification.success(this.literals['updatedMessage']);
        });
    }

    changeTaxIpiSuspens(): void {
        if (this.receivingItem.taxIpiSuspens === false) {
            this.receivingItem.onlyOtherTaxes = this.receivingItem.taxIpiSuspens;
        }
    }
    disableIvaIndex(): boolean {
        if (this.receivingItem.ivaIndex != null && this.receivingItem.ivaIndex !== undefined
            && this.receivingItem.ivaIndex === false) {
            return true;
        } else {
            return false;
        }
    }

    changeIvaIndex(): void {
        if (this.receivingItem.ivaIndex != null && this.receivingItem.ivaIndex === false) {
            this.receivingItem.codeTaxIva = 0;
        }
    }

    changeTypeItem(): void {
        if (this.receivingItem.itemType !== 1) {
            this.receivingItem.ivaIndex = false;
            this.receivingItem.codeTaxIva = 0;
        }
    }
    disableTypeItem(): boolean {
        if (this.receivingItem.itemType != null && this.receivingItem.itemType !== 1) {
            return true;
        } else {
            return false;
        }
    }

    disableItemRecyclable(): boolean {
        if (this.receivingItem.recyclableItem === false) {
            return true;
        } else {
            return false;
        }
    }
    changeRecyclableItem(): void {
        if (this.receivingItem.recyclableItem != null && this.receivingItem.recyclableItem !== true) {
            this.receivingItem.codeRecyclableItem = 0;
            this.receivingItem.unitMeasurementRecyclableItem = '';
        }

    }

    private return(): void {
        this.router.navigate(['./receivingItem']);
    }
    disableFields(): boolean {
        if (this.activatedRoute.snapshot.url[0].path === 'detail') {
            return true;
        } else {
            return false;
        }
    }
    search(loadMore = false): void {
        const itemCode = this.activatedRoute.snapshot.paramMap.get('id');

        if (loadMore === true) {
            this.currentPage = this.currentPage + 1;
        } else {
            this.items = [];
            this.currentPage = 1;
        }


        this.isLoading = true;
        this.parametersSiteItemsSubscription$ = this.parametersSiteItemService
            .getByItem(itemCode, [])
            .subscribe((response: TotvsResponse<IParametersSiteItem>) => {
                this.parametersSiteItems = [...this.parametersSiteItems, ...response.items];
                this.hasNext = response.hasNext;
                this.isLoading = false;

            });
    }

    zoomClassifFormat(value: ITaxClassification): string {
        return `${value.classifCode} - ${value.descriptionClassif}`;
    }

    zoomIpiFamilyFormat(value: ITaxFamily): string {
        return `${value.taxFamilyCode} - ${value.taxFamilyDescription}`;
    }

    zoomTaxServiceInssFormat(value: ITaxServiceInss): string {
        return `${value.inssServiceCode} - ${value.descriptionInssService}`;
    }

    zoomIncomeNaturFormat(value: IIncomeNature): string {
        return `${value.incomeNature} - ${value.descriptionNature}`;

    }

    zoomTaxCodeFormat(value: IIcmsTaxCodeDay): string {
        return `${value.taxCode} - ${value.descriptionTaxCode}`;
    }

    zoomTaxTypeFormat(value: ITaxType): string {
        return `${value.taxCode} - ${value.taxDescription}`;
    }
    zoomUnitMeasurementFormat(value: IUnityMeasures): string {
        return `${value.code} - ${value.description}`;
    }

    private setupComponents() {
        this.optionsIcms = [{ label: 'unable to load...', value: 0 }];
        this.optionsIpi = [{ label: 'unable to load...', value: 0 }];
        this.optionsIss = [{ label: 'unable to load...', value: 0 }];
        this.optionsProductGeneral = [{ label: 'unable to load...', value: 0 }];
        this.optionsRecyclableItem = [{ label: 'unable to load...', value: 0 }];
        this.optionsItemType = [{ label: 'unable to load...', value: 0 }];
        this.optionsOrigin = [
            { label: this.literals['itemCode'], value: 1 },
            { label: this.literals['nature'], value: 2 }
        ];

        this.zoomClassifColumns = [
            { property: 'classifCode', label: this.literals['classifCode'], type: 'string' },
            { property: 'descriptionClassif', label: this.literals['description'], type: 'string' }
        ];

        this.zoomIpiFamilyColumns = [
            { property: 'taxFamilyCode', label: this.literals['ipiFamily'], type: 'string' },
            { property: 'taxFamilyDescription', label: this.literals['description'], type: 'string' }

        ];
        this.zoomTaxServiceInssColumns = [
            { property: 'inssServiceCode', label: this.literals['taxServiceInss'], type: 'string' },
            { property: 'descriptionInssService', label: this.literals['description'], type: 'string' }
        ];
        this.zoomIncomeNaturColumns = [
            { property: 'incomeNature', label: this.literals['incomeNature'], type: 'string', width: '29%' },
            { property: 'descriptionNature', label: this.literals['description'], type: 'string' }
        ];

        this.zoomTaxCodeColumns = [
            { property: 'taxCode', label: this.literals['taxCode'], type: 'string' },
            { property: 'taxDescription', label: this.literals['description'], type: 'string' }
        ];

        this.zoomTaxTypeColumns = [
            { property: 'taxCode', label: this.literals['taxType'], type: 'string', width: '15%' },
            { property: 'taxDescription', label: this.literals['taxDescription'], type: 'string' },
            { property: 'typeDescription', label: this.literals['type'], type: 'string', width: '25%' }

        ];
        this.zoomUnitMeasurementColumns = [
            { property: 'code', label: this.literals['code'], type: 'string' },
            { property: 'description', label: this.literals['description'], type: 'string' }
        ];

        this.editActions = [
            {
                label: this.literals['save'],
                action: this.update.bind(this, this.receivingItem),
            },
            {
                label: this.literals.return,
                action: this.return.bind(this)
            }
        ];


        this.editBreadcrumb = {
            items: [
                {
                    label: this.literals['receivingItem'],
                    link: '/receivingItem'
                },
                {
                    label: this.literals['edit'],
                    link: '/receivingItem/edit'
                }
            ]
        };

        this.detailActions = [
            {
                label: this.literals.return,
                action: this.return.bind(this)
            }
        ];

        this.detailBreadcrumb = {
            items: [
                {
                    label: this.literals['receivingItem'],
                    link: '/receivingItem'
                },
                {
                    label: this.literals['detail'],
                    link: '/receivingItem/detail'
                }
            ]
        };

        this.columnsDetail = [
            { property: 'varQuantityLimit', label: this.literals['varQuantityLimit'], type: 'number' },
            { property: 'variationQtyRe', label: this.literals['variationQtyRe'], type: 'number' },
            { property: 'varAmountLimit', label: this.literals['varAmountLimit'], type: 'number' },
            { property: 'greaterAmtVariance', label: this.literals['varAmountLimit'], type: 'number' }
        ];
        this.columns = [
            {
                property: 'site', label: this.literals['site'], type: 'string'
            },
            {
                property: 'siteName', label: this.literals['siteName'], type: 'string'
            }
        ];
    }

    ngOnDestroy(): void {
        if (this.classifSubscription$) { this.classifSubscription$.unsubscribe(); }
        if (this.taxFamilySubscription$) { this.taxFamilySubscription$.unsubscribe(); }
        if (this.parametersSiteItemsSubscription$) { this.parametersSiteItemsSubscription$.unsubscribe(); }
        if (this.TaxServiceInssSubscription$) { this.TaxServiceInssSubscription$.unsubscribe(); }
        if (this.incomeNatureSubscription$) { this.incomeNatureSubscription$.unsubscribe(); }
        if (this.icmsTaxCodeDaySubscription$) { this.icmsTaxCodeDaySubscription$.unsubscribe(); }
        if (this.taxTypeSubscription$) { this.taxTypeSubscription$.unsubscribe(); }
        if (this.UnityMeasuresSubscription$) { this.UnityMeasuresSubscription$.unsubscribe(); }
        if (this.receivingItemSubscription$) { this.receivingItemSubscription$.unsubscribe(); }

    }
}
