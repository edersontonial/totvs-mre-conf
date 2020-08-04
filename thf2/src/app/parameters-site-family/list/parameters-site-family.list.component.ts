import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
    PoBreadcrumb, PoDisclaimerGroup, PoDisclaimer,
    PoPageAction, PoPageFilter, PoTableColumn,
    PoI18nService
} from '@po-ui/ng-components';

import { forkJoin, Subscription } from 'rxjs';

import { TotvsResponse } from 'dts-backoffice-util';
import { IParametersSiteFamily, ParametersSiteFamily } from '../../shared/model/parameters-site-family.model';
import { ParametersSiteFamilyService } from '../../shared/services/parameter-site-family.service';


@Component({
    selector: 'app-parameters-site-family',
    templateUrl: './parameters-site-family.list.component.html'
})
export class ParametersSiteFamilyListComponent implements OnInit, OnDestroy {

    private itemsSubscription$: Subscription;
    private disclaimers: Array<PoDisclaimer> = [];

    tableActions: Array<PoPageAction>;

    breadcrumb: PoBreadcrumb;
    disclaimerGroup: PoDisclaimerGroup;
    filterSettings: PoPageFilter;

    items: Array<IParametersSiteFamily> = new Array<IParametersSiteFamily>();
    columns: Array<PoTableColumn>;

    hasNext = false;
    pageSize = 20;
    currentPage = 0;
    quickSearchValue = '';

    QUICK_SEARCH_STORAGE = 'mre.parametersSiteFamily.quickSearchValue';
    literals: any = {};

    constructor(
        private service: ParametersSiteFamilyService,
        private poI18nService: PoI18nService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        forkJoin(
            [
                this.poI18nService.getLiterals(),
                this.poI18nService.getLiterals({ context: 'parametersSiteFamily' })
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

        this.itemsSubscription$ = this.service
            .query(disclaimer, this.currentPage, this.pageSize)
            .subscribe((response: TotvsResponse<IParametersSiteFamily>) => {
                this.items = [...this.items, ...response.items];
                this.hasNext = response.hasNext;
            });
    }


    private edit(item: IParametersSiteFamily): void {
        this.router.navigate(['/parametersSiteFamily/edit', ParametersSiteFamily.getInternalId(item)]);
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
                property: 'familyCode', label: this.literals.familyCode, type: 'link',
                action: (value, row) => this.edit(row)
            },
            {
                property: 'familyName', label: this.literals.description, type: 'link',
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
                property: 'varQuantityLimit', label: this.literals.varQuantityLimitColumn, type: 'number',
                format: '1.2-5', visible: false
            },
            {
                property: 'variationQtyRe', label: this.literals.variationQtyReColumn, type: 'number',
                format: '1.2-5', visible: false
            },
            {
                property: 'varAmountLimit', label: this.literals.varAmountLimitColumn, type: 'number',
                format: '1.2-5', visible: false
            },
            {
                property: 'greaterAmtVariance', label: this.literals.greaterAmtVarianceColumn, type: 'number',
                format: '1.2-5', visible: false
            }
        ];

        this.breadcrumb = {
            items: [
                {
                    label: this.literals.parametersSiteFamily,
                    link: '/parametersSiteFamily'
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
            placeholder: this.literals.searchFamilyOrSite
        };
    }

    private detail(item: IParametersSiteFamily): void {
        this.router.navigate(['/parametersSiteFamily', 'detail', ParametersSiteFamily.getInternalId(item)]);
    }

    ngOnDestroy(): void {
        this.itemsSubscription$.unsubscribe();
    }
}
