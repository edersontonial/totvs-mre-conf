import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
    PoBreadcrumb, PoDisclaimerGroup, PoDisclaimer,
    PoPageAction, PoPageFilter, PoTableColumn,
    PoI18nService
} from '@po-ui/ng-components';

import { forkJoin, Subscription } from 'rxjs';

import { TotvsResponse } from 'dts-backoffice-util';
import { IParametersSiteItem, ParametersSiteItem } from '../../shared/model/parameters-site-item.model';
import { ParametersSiteItemService } from '../../shared/services/parameters-site-item.service';



@Component({
    selector: 'app-parameters-site-item',
    templateUrl: './parameters-site-item.list.component.html'
})
export class ParametersSiteItemListComponent implements OnInit, OnDestroy {

    private itemsSubscription$: Subscription;
    private disclaimers: Array<PoDisclaimer> = [];

    tableActions: Array<PoPageAction>;

    breadcrumb: PoBreadcrumb;
    disclaimerGroup: PoDisclaimerGroup;
    filterSettings: PoPageFilter;

    items: Array<IParametersSiteItem> = new Array<IParametersSiteItem>();
    columns: Array<PoTableColumn>;

    hasNext = false;
    pageSize = 20;
    currentPage = 0;
    quickSearchValue = '';

    QUICK_SEARCH_STORAGE = 'mre.parametersSiteitem.quickSearchValue';
    literals: any = {};

    constructor(
        private parametersSiteItemService: ParametersSiteItemService,
        private poI18nService: PoI18nService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        forkJoin(
            [
                this.poI18nService.getLiterals(),
                this.poI18nService.getLiterals({ context: 'parametersSiteItem' })
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

        this.itemsSubscription$ = this.parametersSiteItemService
            .query(disclaimer, this.currentPage, this.pageSize)
            .subscribe((response: TotvsResponse<IParametersSiteItem>) => {
                this.items = [...this.items, ...response.items];
                this.hasNext = response.hasNext;
            });
    }


    private edit(item: IParametersSiteItem): void {
        this.router.navigate(['/parametersSiteItem/edit', ParametersSiteItem.getInternalId(item)]);
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
            { action: this.edit.bind(this), label: this.literals.edit, icon: 'po-icon po-icon-edit' },
            { action: this.detail.bind(this), label: this.literals.detail, icon: 'po-icon po-icon-document' }
        ];

        this.columns = [
            {
                property: 'item', label: this.literals.item, type: 'link',
                action: (value, row) => this.edit(row)
            },
            {
                property: 'itemDescription', label: this.literals.description, type: 'link',
                action: (value, row) => this.edit(row)
            },
            {
                property: 'site', label: this.literals.site, type: 'link',
                action: (value, row) => this.edit(row)
            },
            {
                property: 'siteName', label: this.literals.siteName, type: 'link',
                action: (value, row) => this.edit(row)
            },
            {
                property: 'limitVariationQuantity', label: this.literals.limitVariationQuantity, type: 'number',
                format: '1.4-4', visible: false
            },
            {
                property: 'variationGreaterAmountReceipt', label: this.literals.variationGreaterAmountReceipt, type: 'number',
                format: '1.5-5', visible: false
            },
            {
                property: 'limitVariationValue', label: this.literals.limitVariationValue, type: 'number',
                format: '1.5-5', visible: false
            },
            {
                property: 'variationQuantityReceipt', label: this.literals.variationQuantityReceipt, type: 'number',
                format: '1.2-2', visible: false
            }
        ];

        this.breadcrumb = {
            items: [
                {
                    label: this.literals.parametersSiteItem,
                    link: '/parametersSiteItem'
                }
            ]
        };

        this.disclaimerGroup = {
            title: this.literals.filters,
            disclaimers: [],
            change: this.onChangeDisclaimer.bind(this)
        };

        this.filterSettings = {
            action: 'quickSearch',
            ngModel: 'quickSearchValue',
            placeholder: this.literals.searchItemOrSite
        };
    }

    private detail(item: IParametersSiteItem): void {
        this.router.navigate(['/parametersSiteItem', 'detail', ParametersSiteItem.getInternalId(item)]);
    }

    ngOnDestroy(): void {
        this.itemsSubscription$.unsubscribe();
    }
}
