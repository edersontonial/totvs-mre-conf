import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import {
    PoBreadcrumb,
    PoModalAction,
    PoPageAction,
    PoI18nService,
    PoI18nPipe,
    PoNotificationService,
    PoTableColumn,
    PoLookupColumn,
    PoSelectOption,
    PoDisclaimer,
    PoModalComponent
} from '@po-ui/ng-components';

import { TotvsResponse } from 'dts-backoffice-util';
import { IReceivingFamily, ReceivingFamily } from '../../shared/model/receiving-family.model';
import { ReceivingFamilyService } from '../../shared/services/receiving-family.service';
import { TaxClassificationService } from '../../shared/services/tax-classification.services';
import { TaxFamilyService } from '../../shared/services/tax-family.services';
import { ITaxClassification } from '../../shared/model/tax-classification.model';
import { ITaxFamily } from '../../shared/model/tax-family.model';
import { ITaxType } from '../../shared/model/tax-type.model';
import { TaxTypeService } from '../../shared/services/tax-type.services';
import { IParametersSiteFamily } from '../../shared/model/parameters-site-family.model';
import { ParametersSiteFamilyService } from '../../shared/services/parameter-site-family.service';
import { DataService } from 'src/app/shared/services/service-data.service';


@Component({
    selector: 'app-edit',
    templateUrl: './receiving-family.edit.component.html',
    styleUrls: ['./receiving-family.edit.component.css']
})
export class ReceivingFamilyEditComponent implements OnInit, OnDestroy {
    @ViewChild('modalReplica', { static: false }) modalReplica: PoModalComponent;


    confirmReplicaAction: PoModalAction;
    cancelReplicaAction: PoModalAction;
    backModalAction: PoModalAction;

    errorPattern: string;

    detailBreadcrumb: PoBreadcrumb;
    editBreadcrumb: PoBreadcrumb;
    modalActions: Array<PoModalAction>;
    detailActions: Array<PoPageAction>;
    editActions: Array<PoPageAction>;

    zoomClassifColumns: Array<PoLookupColumn>;
    zoomIpiFamilyColumns: Array<PoLookupColumn>;
    zoomTaxTypeColumns: Array<PoLookupColumn>;
    optionsIcms: Array<PoSelectOption> = [];
    optionsIpi: Array<PoSelectOption> = [];
    optionsIss: Array<PoSelectOption> = [];

    isPageEdit: boolean;
    receivingFamily: IReceivingFamily = ReceivingFamily.empty();
    oldReceivingFamily: IReceivingFamily = ReceivingFamily.empty();

    literals: any = {};
    validate: any = { minLgth: 3, maxLgth: 50 };

    private disclaimers: Array<PoDisclaimer> = [];

    columns: Array<PoTableColumn>;

    hasNext = false;
    pageSize = 20;
    currentPage = 0;
    isLoading = true;

    receivingSiteFamilyitems: Array<IParametersSiteFamily> = new Array<IParametersSiteFamily>();
    items: Array<IParametersSiteFamily> = new Array<IParametersSiteFamily>();

    receiveFamilySubscription$: Subscription;
    receiveSiteFamilySubscription$: Subscription;
    classifSubscription$: Subscription;
    taxFamilySubscription$: Subscription;
    taxTypeSubscription$: Subscription;

    metadados: any;

    columnsDetail: Array<PoTableColumn>;
    taxClassificationDesc: string;
    taxFamilyDesc: string;
    taxTypeDesc: string;
    familyCode: string;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private poI18nPipe: PoI18nPipe,
        private poI18nService: PoI18nService,
        private poNotification: PoNotificationService,
        private serviceReceivingFamily: ReceivingFamilyService,
        private serviceParametersSiteFamily: ParametersSiteFamilyService,
        public serviceClassif: TaxClassificationService,
        public serviceTaxFamily: TaxFamilyService,
        public serviceTaxType: TaxTypeService,
        private dataService: DataService

    ) { }

    ngOnInit(): void {
        forkJoin(
            [
                this.poI18nService.getLiterals(),
                this.poI18nService.getLiterals({ context: 'receivingFamily' })
            ]
        ).subscribe(literals => {
            literals.map(item => Object.assign(this.literals, item));

            this.setupComponents();
            this.get();
            this.oldReceivngFamily();

        });

    }

    private return(): void {
        this.router.navigate(['./receivingFamily']);
    }



    private get(): void {
        this.familyCode = this.activatedRoute.snapshot.paramMap.get('familyCode');

        if (this.familyCode === '') {
            this.familyCode = '\'\'';
        }

        this.searchMetadados();
        if (this.familyCode) {

            if (this.activatedRoute.snapshot.url[0].path === 'detail') {
                this.isPageEdit = false;
            } else {
                this.isPageEdit = true;
            }

            this.receiveFamilySubscription$ = this.serviceReceivingFamily
                .getById(this.familyCode).subscribe((item: IReceivingFamily) => {

                    this.receivingFamily = item;
                    this.search();
                    if (this.activatedRoute.snapshot.url[0].path === 'detail') {
                        this.getDescriptionDetail(item);
                    }

                });
        }
    }

    private openModal(): void {
        this.modalReplica.open();
    }
    private update(): void {
        this.receiveFamilySubscription$ = this.serviceReceivingFamily.update(this.receivingFamily).subscribe(() => {
            this.router.navigate(['/receivingFamily']);
            this.poNotification.success(this.literals['updatedMessage']);

        });
    }
    private oldReceivngFamily() {
        this.familyCode = this.activatedRoute.snapshot.paramMap.get('familyCode');

        if (this.familyCode === '') {
            this.familyCode = '\'\'';
        }
        if (this.familyCode) {

            this.receiveFamilySubscription$ = this.serviceReceivingFamily
                .getById(this.familyCode).subscribe((item: IReceivingFamily) => {

                    this.oldReceivingFamily = item;
                    this.dataService.setOldRecord(this.oldReceivingFamily);
                });
        }

    }
    private replicationDataAndUpdate(): void {
        this.modalReplica.close();
        this.receiveFamilySubscription$ = this.serviceReceivingFamily.update(this.receivingFamily).subscribe(() => {
            this.dataService.setNameKey('familyCode');
            this.dataService.setFieldSearchProduct('family');
            this.dataService.setValueKey(this.receivingFamily.familyCode);
            this.dataService.setRoute(`/receivingFamily/edit/${this.receivingFamily.familyCode}`);
            this.dataService.setRouteParent('/receivingFamily');
            this.dataService.setApiUrl('/dts/datasul-rest/resources/prg/cdp/v1/parametersSiteFamily');
            this.dataService.setOrigin(this.activatedRoute.snapshot.url[0].path);
            this.dataService.setBreadCrumb({
                items: [{
                    label: this.literals['receivingFamily'],
                    link: '/receivingFamily'
                },
                {
                    label: this.literals['edit'],
                    link: `/receivingFamily/edit/${this.receivingFamily.familyCode}`
                }
                ]
            });
            this.router.navigate(['/replicationDataFamily']);


        });
    }

    disableFields(): boolean {
        if (this.activatedRoute.snapshot.url[0].path === 'detail') {
            return true;
        } else {
            return false;
        }
    }

    search(loadMore = false): void {
        const familyCode = this.activatedRoute.snapshot.paramMap.get('familyCode');

        if (loadMore === true) {
            this.currentPage = this.currentPage + 1;
        } else {
            this.items = [];
            this.currentPage = 1;
        }

        this.isLoading = true;
        this.receiveSiteFamilySubscription$ = this.serviceParametersSiteFamily
            .getByFamily(familyCode, [])
            .subscribe((response: TotvsResponse<IParametersSiteFamily>) => {
                this.receivingSiteFamilyitems = [...this.receivingSiteFamilyitems, ...response.items];
                this.hasNext = response.hasNext;
                this.isLoading = false;

            });
    }

    getDescriptionDetail(item: IReceivingFamily): void {

        if (item.taxClassification != null && item.taxClassification !== undefined) {
            this.getClassif(item.taxClassification);
        } else {
            this.taxClassificationDesc = '';
        }

        if (item.ipiFamily != null && item.ipiFamily !== undefined) {
            this.getTaxFamily(item.ipiFamily);
        } else {
            this.taxFamilyDesc = '';
        }
        if (item.rfTaxation != null && item.rfTaxation !== undefined) {
            this.getTaxType(item.rfTaxation);
        } else {
            this.taxTypeDesc = '';
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

    getTaxType(rfTaxation: number): void {

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

    private setupComponents(): void {


        this.optionsIcms = [{ label: 'unable to load...', value: 0 }];
        this.optionsIpi = [{ label: 'unable to load...', value: 0 }];
        this.optionsIss = [{ label: 'unable to load...', value: 0 }];

        this.confirmReplicaAction = {
            action: () => this.replicationDataAndUpdate(),
            label: this.literals.yes
        };

        this.cancelReplicaAction = {
            label: this.literals.no,
            action: this.update.bind(this, this.receivingFamily)
        };


        this.backModalAction = {
            label: this.literals['yes'],
            action: () => this.router.navigate(['./receivingFamily'])
        };

        this.zoomClassifColumns = [
            { property: 'classifCode', label: this.literals['classifCode'], type: 'string' },
            { property: 'descriptionClassif', label: this.literals['descriptionClassif'], type: 'string' }
        ];

        this.zoomIpiFamilyColumns = [
            { property: 'taxFamilyCode', label: this.literals['taxFamilyCode'], type: 'string' },
            { property: 'taxFamilyDescription', label: this.literals['taxFamilyDescription'], type: 'string' }

        ];
        this.zoomTaxTypeColumns = [
            { property: 'taxCode', label: this.literals['taxType'], type: 'string', width: '15%' },
            { property: 'taxDescription', label: this.literals['taxDescription'], type: 'string' },
            { property: 'typeDescription', label: this.literals['type'], type: 'string', width: '25%' }

        ];


        this.editActions = [
            {
                label: this.literals['save'],
                action: this.openModal.bind(this, this.receivingFamily)
            },
            {
                label: this.literals.return,
                action: this.return.bind(this)
            }
        ];

        this.detailActions = [
            {
                label: this.literals.return,
                action: this.return.bind(this)
            }
        ];

        this.editBreadcrumb = {
            items: [
                {
                    label: this.literals['receivingFamily'],
                    link: '/receivingFamily'
                },
                {
                    label: this.literals['edit'],
                    link: '/receivingFamily/edit'
                }
            ]
        };
        this.detailBreadcrumb = {
            items: [
                {
                    label: this.literals['receivingFamily'],
                    link: '/receivingFamily'
                },
                {
                    label: this.literals['detail'],
                    link: '/receivingFamily/detail'
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

    zoomClassifFormat(value: ITaxClassification): string {
        return `${value.classifCode} - ${value.descriptionClassif}`;
    }

    zoomIpiFamilyFormat(value: ITaxFamily): string {
        return `${value.taxFamilyCode} - ${value.taxFamilyDescription}`;
    }

    zoomTaxTypeFormat(value: ITaxType): string {
        return `${value.taxCode} - ${value.taxDescription}`;
    }

    searchMetadados(): void {
        this.receiveFamilySubscription$ = this.serviceReceivingFamily.getMetadados().subscribe((metad: any) => {
            this.metadados = metad;
        });
    }

    ngOnDestroy(): void {
        if (this.receiveFamilySubscription$) { this.receiveFamilySubscription$.unsubscribe(); }
        if (this.receiveSiteFamilySubscription$) { this.receiveSiteFamilySubscription$.unsubscribe(); }
        if (this.classifSubscription$) { this.classifSubscription$.unsubscribe(); }
        if (this.taxFamilySubscription$) { this.taxFamilySubscription$.unsubscribe(); }
        if (this.taxTypeSubscription$) { this.taxTypeSubscription$.unsubscribe(); }
    }
}
