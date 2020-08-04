import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
    PoBreadcrumb, PoDisclaimerGroup, PoDisclaimer, PoModalAction,
    PoModalComponent, PoPageAction, PoPageFilter, PoTableColumn,
    PoI18nService, PoI18nPipe, PoNotificationService
} from '@po-ui/ng-components';

import { forkJoin, Subscription } from 'rxjs';

import { TotvsResponse } from 'dts-backoffice-util';

import { IReceivingFamily } from '../../shared/model/receiving-family.model';
import { ReceivingFamilyService } from '../../shared/services/receiving-family.service';
import { DataService } from '../../shared/services/service-data.service';


@Component({
    selector: 'app-receiving-family',
    templateUrl: './receiving-family.list.component.html',
    styleUrls: ['./receiving-family.list.component.css']
})
export class ReceivingFamilyListComponent implements OnInit, OnDestroy {

    @ViewChild('modalDelete', { static: false }) modalDelete: PoModalComponent;

    private itemsSubscription$: Subscription;
    private disclaimers: Array<PoDisclaimer> = [];

    cancelDeleteAction: PoModalAction;
    confirmDeleteAction: PoModalAction;

    pageActions: Array<PoPageAction>;
    tableActions: Array<PoPageAction>;

    breadcrumb: PoBreadcrumb;
    disclaimerGroup: PoDisclaimerGroup;
    filterSettings: PoPageFilter;

    items: Array<IReceivingFamily> = new Array<IReceivingFamily>();
    columns: Array<PoTableColumn>;

    hasNext = false;
    pageSize = 20;
    currentPage = 0;
    isLoading = true;
    quickSearchValue = '';
    QUICK_SEARCH_STORAGE = 'mre.receivingFamily.quickSearchValue';
    moreSelected = false;
    selectedLength = 0;

    literals: any = {};

    constructor(
        private service: ReceivingFamilyService,
        private poI18nPipe: PoI18nPipe,
        private poI18nService: PoI18nService,
        private poNotification: PoNotificationService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
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

            this.quickSearchValue = localStorage.getItem(this.QUICK_SEARCH_STORAGE);
            this.setupComponents();

            if (this.quickSearchValue) {
                this.quickSearch();
            } else {
                this.search();
            }

        });
    }

    quickSearch(filter = [{ property: 'quickSearch', value: this.quickSearchValue }]): void {
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
        this.itemsSubscription$ = this.service
            .query(disclaimer, this.currentPage, this.pageSize)
            .subscribe((response: TotvsResponse<IReceivingFamily>) => {
                this.items = [...this.items, ...response.items];
                this.hasNext = response.hasNext;
                this.isLoading = false;
            });
    }


    private edit(item: IReceivingFamily): void {
        this.router.navigate(['/receivingFamily/edit', item.familyCode]);
    }

    private resetFilters(): void {
        this.quickSearchValue = '';
    }

    private onChangeDisclaimer(disclaimers): void {
        this.disclaimers = disclaimers;
        if (this.disclaimers.length === 0) {
            this.resetFilters();
        }
        localStorage.setItem(this.QUICK_SEARCH_STORAGE, this.quickSearchValue);
        this.search();
    }

    private selected(): boolean {
        return !this.items.find(item => item['$selected']);
    }

    private replicationData(item: IReceivingFamily): void {
        this.itemsSubscription$ = this.service.replicationData(item).subscribe(() => {
            this.dataService.setOrigin('list');
            this.dataService.setNameKey('familyCode');
            this.dataService.setFieldSearchProduct('family');
            this.dataService.setValueKey(item.familyCode);
            this.dataService.setBreadCrumb(this.breadcrumb);
            this.dataService.setRoute('/receivingFamily');
            this.dataService.setRouteParent('/receivingFamily');
            this.dataService.setApiUrl('/dts/datasul-rest/resources/prg/cdp/v1/parametersSiteFamily');
            this.dataService.setOldRecord(item);
            this.router.navigate(['/replicationDataFamily']);
        });

    }

    private setupComponents(): void {

        this.tableActions = [
            { action: this.edit.bind(this), label: this.literals['edit'], icon: 'po-icon po-icon-edit' },
            { action: this.detail.bind(this), label: this.literals['detail'], icon: 'po-icon po-icon-document' },
            { action: this.replicationData.bind(this), label: this.literals['replica'], icon: 'po-icon po-icon-change' }
        ];

        this.columns = [
            {
                property: 'familyCode', label: this.literals['familyCode'], type: 'link',
                action: (value, row) => this.edit(row)
            },
            {
                property: 'description', label: this.literals['description'], type: 'link',
                action: (value, row) => this.edit(row)
            }
        ];

        this.breadcrumb = {
            items: [
                {
                    label: this.literals['receivingFamily'],
                    link: '/receivingFamily'
                }
            ]
        };

        this.disclaimerGroup = {
            title: this.literals['filters'],
            disclaimers: [],
            change: this.onChangeDisclaimer.bind(this)
        };

        this.filterSettings = {
            action: 'quickSearch',
            ngModel: 'quickSearchValue',
            placeholder: this.literals['search']
        };
    }

    private detail(item: IReceivingFamily): void {
        this.router.navigate(['/receivingFamily', 'detail', item.familyCode]);
    }

    ngOnDestroy(): void {
        this.itemsSubscription$.unsubscribe();
    }
}
