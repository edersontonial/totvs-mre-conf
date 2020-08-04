import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import {
    FormBuilder,
} from '@angular/forms';
import {
    PoBreadcrumb,
    PoI18nService,
    PoI18nPipe,
    PoNotificationService,
    PoPageAction
} from '@po-ui/ng-components';

import { IParametersSiteItem, ParametersSiteItem } from '../../shared/model/parameters-site-item.model';
import { ParametersSiteItemService } from '../../shared/services/parameters-site-item.service';

@Component({
    selector: 'app-edit',
    templateUrl: './parameters-site-item.edit.component.html'
})
export class ParametersSiteItemEditComponent implements OnInit, OnDestroy {

    editBreadcrumb: PoBreadcrumb;
    detailBreadcrumb: PoBreadcrumb;
    editActions: Array<PoPageAction>;
    detailActions: Array<PoPageAction>;

    isPageEdit: boolean;
    parametersSiteItem: IParametersSiteItem = ParametersSiteItem.empty();

    literals: any = {};

    receiveSiteItemSubscription$: Subscription;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private poI18nService: PoI18nService,
        private poNotification: PoNotificationService,
        private parametersSiteItemService: ParametersSiteItemService
    ) { }

    ngOnInit(): void {
        forkJoin(
            [
                this.poI18nService.getLiterals(),
                this.poI18nService.getLiterals({ context: 'parametersSiteItem' })
            ]
        ).subscribe(literals => {
            literals.map(item => Object.assign(this.literals, item));
            this.setupComponents();
            this.get();
        });
    }

    private get() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (this.activatedRoute.snapshot.url[0].path === 'detail') {
            this.isPageEdit = false;
        } else {
            this.isPageEdit = true;
        }

        this.receiveSiteItemSubscription$ = this.parametersSiteItemService
            .getById(id).subscribe((item: IParametersSiteItem) => {
                this.parametersSiteItem = item;
            });
    }

    private update() {
        this.parametersSiteItemService.update(this.parametersSiteItem).subscribe(() => {
            this.router.navigate(['/parametersSiteItem']);
            this.poNotification.success(this.literals['updatedMessage']);
        });
    }

    private return(): void {
        this.router.navigate(['./parametersSiteItem']);
    }

    private setupComponents() {

        this.editActions = [
            {
                label: this.literals.save,
                action: this.update.bind(this, this.parametersSiteItem),
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
                    label: this.literals['parametersSiteItem'],
                    link: '/parametersSiteItem' },
                {
                    label: this.literals['edit'],
                    link: '/parametersSiteItem/edit'
                }
            ]
        };

        this.detailBreadcrumb = {
            items: [
                {
                    label: this.literals['parametersSiteItem'],
                    link: '/parametersSiteItem' },
                {
                    label: this.literals['detail'],
                    link: '/parametersSiteItem/detail'
                }
            ]
        };

    }

    ngOnDestroy(): void {
        if (this.receiveSiteItemSubscription$) {
            this.receiveSiteItemSubscription$.unsubscribe();
        }
    }
}
