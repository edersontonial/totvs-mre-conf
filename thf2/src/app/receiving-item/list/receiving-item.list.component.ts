import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
    PoBreadcrumb, PoDisclaimerGroup, PoDisclaimer,
    PoPageAction, PoPageFilter, PoTableColumn,
    PoI18nService, PoI18nPipe, PoNotificationService
} from '@po-ui/ng-components';

import { forkJoin, Subscription } from 'rxjs';

import { TotvsResponse } from 'dts-backoffice-util';

import { IReceivingItem } from '../../shared/model/receiving-item.model';
import { ReceivingItemService } from '../../shared/services/receiving-item.service';

@Component({
    selector: 'app-receiving-item',
    templateUrl: './receiving-item.list.component.html'
})
export class ReceivingItemListComponent implements OnInit, OnDestroy {


    private itemsSubscription$: Subscription;
    private disclaimers: Array<PoDisclaimer> = [];

    tableActions: Array<PoPageAction>;

    breadcrumb: PoBreadcrumb;
    disclaimerGroup: PoDisclaimerGroup;
    filterSettings: PoPageFilter;

    items: Array<IReceivingItem> = new Array<IReceivingItem>();
    columns: Array<PoTableColumn>;


    hasNext = false;
    pageSize = 20;
    currentPage = 0;
    isLoading = true;
    quickSearchValue = '';
    QUICK_SEARCH_STORAGE = 'mre.receivingItem.quickSearchValue';

    literals: any = {};

    constructor(
        private service: ReceivingItemService,
        private poI18nPipe: PoI18nPipe,
        private poI18nService: PoI18nService,
        private poNotification: PoNotificationService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        forkJoin(
            [
                this.poI18nService.getLiterals(),
                this.poI18nService.getLiterals({ context: 'receivingItem' })
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
            .subscribe((response: TotvsResponse<IReceivingItem>) => {
                this.items = [...this.items, ...response.items];
                this.hasNext = response.hasNext;
                this.isLoading = false;
            });
    }


    private edit(item: IReceivingItem): void {
        this.router.navigate(['/receivingItem/edit', item.itemCode]);
    }
    private detail(item: IReceivingItem): void {
        this.router.navigate(['/receivingItem', 'detail', item.itemCode]);
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

    private setupComponents(): void {

        this.tableActions = [
            { action: this.edit.bind(this), label: this.literals['edit'], icon: 'po-icon po-icon-edit' },
            { action: this.detail.bind(this), label: this.literals['detail'], icon: 'po-icon po-icon-document' }
        ];

        this.columns = [
            {
                property: 'itemCode', label: this.literals['itemCode'], type: 'link',
                action: (value, row) => this.edit(row)
            },
            {
                property: 'descriptionItem', label: this.literals['description'], type: 'link',
                action: (value, row) => this.edit(row)
            }
        ];

        this.breadcrumb = {
            items: [
                {
                    label: this.literals['receivingItem'],
                    link: '/receivingItem'
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


    ngOnDestroy(): void {
        this.itemsSubscription$.unsubscribe();
    }
}
