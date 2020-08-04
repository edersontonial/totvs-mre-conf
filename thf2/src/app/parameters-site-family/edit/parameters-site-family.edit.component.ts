import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import {
    PoBreadcrumb,
    PoPageAction,
    PoI18nService,
    PoNotificationService,
} from '@po-ui/ng-components';

import { IParametersSiteFamily, ParametersSiteFamily } from '../../shared/model/parameters-site-family.model';
import { ParametersSiteFamilyService } from '../../shared/services/parameter-site-family.service';


@Component({
    selector: 'app-edit-parameters-site-family',
    templateUrl: './parameters-site-family.edit.component.html'
})
export class ParametersSiteFamilyEditComponent implements OnInit, OnDestroy {

    detailBreadcrumb: PoBreadcrumb;
    editBreadcrumb: PoBreadcrumb;
    detailActions: Array<PoPageAction>;
    editActions: Array<PoPageAction>;

    isPageEdit: boolean;
    parametersSiteFamily: IParametersSiteFamily = ParametersSiteFamily.empty();

    literals: any = {};
    receiveSiteFamilySubscription$: Subscription;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private poI18nService: PoI18nService,
        private poNotification: PoNotificationService,
        private serviceParametersSiteFamily: ParametersSiteFamilyService
    ) { }

    ngOnInit(): void {
        forkJoin(
            [
                this.poI18nService.getLiterals(),
                this.poI18nService.getLiterals({ context: 'parametersSiteFamily' })
            ]
        ).subscribe(literals => {
            literals.map(item => Object.assign(this.literals, item));

            this.setupComponents();
            this.get();
        });

    }

    private return(): void {
        this.router.navigate(['./parametersSiteFamily']);
    }

    private get(): void {
        const id = this.activatedRoute.snapshot.paramMap.get('id');

        if (this.activatedRoute.snapshot.url[0].path === 'detail') {
            this.isPageEdit = false;
        } else {
            this.isPageEdit = true;
        }

        this.receiveSiteFamilySubscription$ = this.serviceParametersSiteFamily
            .getById(id).subscribe((item: IParametersSiteFamily) => {
                this.parametersSiteFamily = item;
            });
    }

    private update(): void {
        this.receiveSiteFamilySubscription$ = this.serviceParametersSiteFamily.update(this.parametersSiteFamily).subscribe(() => {
            this.poNotification.success(this.literals.updatedMessage);
            this.router.navigate(['/parametersSiteFamily']);
        });
    }

    private setupComponents(): void {

        this.editActions = [
            {
                label: this.literals.save,
                action: this.update.bind(this, this.parametersSiteFamily),
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
                    label: this.literals.parametersSiteFamily,
                    link: '/parametersSiteFamily'
                },
                {
                    label: this.literals.edit,
                    link: '/parametersSiteFamily/edit'
                }
            ]
        };
        this.detailBreadcrumb = {
            items: [
                {
                    label: this.literals.ParametersSiteFamily,
                    link: '/parametersSiteFamily'
                },
                {
                    label: this.literals.detail,
                    link: '/parametersSiteFamily/detail'
                }
            ]
        };
    }

    ngOnDestroy(): void {
        if (this.receiveSiteFamilySubscription$) {
            this.receiveSiteFamilySubscription$.unsubscribe();
        }
    }
}
