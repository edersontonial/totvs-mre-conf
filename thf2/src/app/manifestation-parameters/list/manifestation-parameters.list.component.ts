// tslint:disable:no-string-literal
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import {
    PoBreadcrumb, PoDisclaimerGroup, PoDisclaimer, PoModalAction,
    PoModalComponent, PoPageAction, PoPageFilter, PoTableColumn,
    PoI18nService, PoI18nPipe, PoNotificationService, PoDialogService, PoMultiselectOption
} from '@po-ui/ng-components';

import { forkJoin, Subscription } from 'rxjs';

import { TotvsResponse, DisclaimerUtil, FieldValidationUtil, IFilterRangeNumber } from 'dts-backoffice-util';
import { IManifestationParameters, ManifestationParameters, IEnvironmentType } from '../../shared/model/manifestation-parameters.model';
import { ManifestationParametersService } from '../../shared/services/manifestation-parameters.service';

@Component({
    selector: 'app-manifestation-parameters',
    templateUrl: './manifestation-parameters.list.component.html',
    styleUrls: ['./manifestation-parameters.list.component.css']
})
export class ManifestationParametersListComponent implements OnInit, OnDestroy {

    private manifestationSubscription$: Subscription;
    private disclaimers: Array<PoDisclaimer> = [];

    pageActions: Array<PoPageAction>;
    tableActions: Array<PoPageAction>;

    breadcrumb: PoBreadcrumb;
    disclaimerGroup: PoDisclaimerGroup;
    filterSettings: PoPageFilter;

    items: Array<IManifestationParameters> = new Array<IManifestationParameters>();
    environmentType: Array<any>;
    columns: Array<PoTableColumn>;

    hasNext = false;
    pageSize = 20;
    currentPage = 0;
    isLoading = true;
    quickSearchValue = '';
    selectedLength = 0;

    literals: any = {};

    constructor(
        private serviceManifestation: ManifestationParametersService,
        private poI18nPipe: PoI18nPipe,
        private poI18nService: PoI18nService,
        private poDialogService: PoDialogService,
        private poNotification: PoNotificationService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        forkJoin(
            [
                this.poI18nService.getLiterals(),
                this.poI18nService.getLiterals({ context: 'manifestationParameters' })
            ]
        ).subscribe(literals => {
            literals.map(item => Object.assign(this.literals, item));
            this.setupComponents();
            this.search();
        });
    }

    private setupComponents(): void {

        this.tableActions = [

            { action: this.edit.bind(this), label: this.literals['edit'], icon: 'po-icon po-icon-edit' },
            { action: this.copy.bind(this), label: this.literals['copy'], icon: 'po-icon po-icon-copy' },
            { action: this.detail.bind(this), label: this.literals['detail'], icon: 'po-icon po-icon-document' },
            { action: this.delete.bind(this), label: this.literals['remove'], icon: 'po-icon po-icon-delete' }
        ];

        this.pageActions = [
            {
                label: this.literals['add'],
                action: () => this.router.navigate(['manifestationParameters/new']), icon: 'po-icon-plus'
            }
        ];
        this.environmentType = ManifestationParameters.environmentType(this.literals);

        this.columns = [
            {
                property: 'siteId', label: this.literals['siteId'], type: 'link',
                action: (value: string, row: IManifestationParameters) => this.actionTable(row)
            },
            {
                property: 'siteName', label: this.literals['siteName'], type: 'link',
                action: (value: string, row: IManifestationParameters) => {
                    return this.actionTable(row);
                }
            },

            { property: 'environment', label: this.literals['environment'], type: 'label', labels: this.environmentType },
            { property: 'processVersion', label: this.literals['processVersion'], type: 'string' },
            {
                property: 'manualManifestation', label: this.literals['manualManifestationCol'], type: 'icon',
                icons: this.getIcons(this.literals['manualManifestation'])
            },
            {
                property: 'manifestationByReceipt', label: this.literals['manifestationByReceiptCol'], type: 'icon',
                icons: this.getIcons(this.literals['manifestationByReceipt'])
            }
        ];

        this.breadcrumb = {
            items: [
                {
                    label: this.literals['manifestationParameters'],
                    link: '/manifestationParameters'
                }
            ]
        };

        this.disclaimerGroup = {
            title: this.literals['filters'],
            disclaimers: [],
            change: this.onChangeDisclaimer.bind(this)
        };

        this.filterSettings = {
            action: 'searchBySiteId',
            ngModel: 'quickSearchValue',
            placeholder: this.literals['search']
        };

    }

    searchBySiteId(filter = [{ property: 'quickSearch', value: this.quickSearchValue }]): void {
        this.disclaimers = [...filter];
        this.disclaimerGroup.disclaimers = [...this.disclaimers];
    }

    search(loadMore = false): void {

        const disclaimer = this.disclaimers || [];

        if (loadMore === true) {
            this.currentPage = this.currentPage + 1;
        } else {
            this.items = [];
            this.currentPage = 1;
        }

        this.isLoading = true;
        this.manifestationSubscription$ = this.serviceManifestation
            .query(disclaimer, this.currentPage, this.pageSize)
            .subscribe((response: TotvsResponse<IManifestationParameters>) => {
                this.items = [...this.items, ...response.items];
                this.hasNext = response.hasNext;
                this.isLoading = false;
            }, (err: any) => {
                /*Se retornar erro desabilitar o botão adicionar*/
                this.pageActions = undefined;

            });
    }

    delete(item: IManifestationParameters): void {
        this.poDialogService.confirm({
            title: this.literals['remove'],
            message: this.poI18nPipe.transform(this.literals['modalDeleteMessage'], [item.siteId]),
            confirm: () => {
                this.manifestationSubscription$ = this.serviceManifestation
                    .delete(item.siteId)
                    .subscribe(response => {
                        this.router.navigate(['/manifestationParameters']);
                        this.poNotification.success(this.literals['excludedMessage']);
                        this.search();
                    }, (err: any) => {
                        this.search();
                    });
            }
        });
    }
    getIcons(strTooltip: string): any[] {
        return [
            { value: true, icon: 'po-icon-ok', color: 'color-11', tooltip: strTooltip },
            { value: false, icon: 'po-icon-minus', color: 'color-07', tooltip: `${this.literals.no} ${strTooltip}` }
        ];
    }
    private actionTable(item: IManifestationParameters): void {
        this.edit(item);
    }

    private detail(item: IManifestationParameters): void {
        this.router.navigate(['/manifestationParameters', 'detail', item.siteId]);
    }

    private copy(item: IManifestationParameters): void {
        this.router.navigate(['/manifestationParameters', 'copy', item.siteId]);
    }
    private edit(item: IManifestationParameters): void {
        this.router.navigate(['/manifestationParameters', 'edit', item.siteId]);
    }

    private create(): void {
        this.router.navigate(['/manifestationParameters', 'new']);
    }

    private resetFilters(): void {
        this.quickSearchValue = '';
    }

    private onChangeDisclaimer(disclaimers): void {
        this.disclaimers = disclaimers;
        if (this.disclaimers.length === 0) {
            this.resetFilters();
        }
        this.search();
    }

    ngOnDestroy(): void {
        this.manifestationSubscription$.unsubscribe();
    }
}
