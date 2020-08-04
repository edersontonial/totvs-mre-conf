import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import {
    PoBreadcrumb, PoModalAction, PoPageAction, PoI18nService, PoI18nPipe,
    PoNotificationService, PoLookupColumn, PoSelectOption, PoLookupComponent
} from '@po-ui/ng-components';
import {
    IManifestationParameters, ManifestationParameters,
    Environment, AutomaticManifestation
} from '../../shared/model/manifestation-parameters.model';
import { ManifestationParametersService } from '../../shared/services/manifestation-parameters.service';
import { IEstablishmentsPublic } from '../../shared/model/establishments-public.model';
import { EstablishmentsPublicService } from '../../shared/services/establishments-public.service';




@Component({
    selector: 'app-edit',
    templateUrl: './manifestation-parameters.edit.component.html',
    styleUrls: ['./manifestation-parameters.edit.component.css']
})
export class ManifestationParametersEditComponent implements OnInit, OnDestroy {

    @ViewChild(PoLookupComponent, { static: true }) site: PoLookupComponent;

    newBreadcrumb: PoBreadcrumb;
    editBreadcrumb: PoBreadcrumb;
    copyBreadcrumb: PoBreadcrumb;
    detailBreadcrumb: PoBreadcrumb;
    modalActions: Array<PoModalAction>;
    detailActions: Array<PoPageAction>;
    editActions: Array<PoPageAction>;
    newActions: Array<PoPageAction>;
    zoomSiteColumns: Array<PoLookupColumn>;
    optionsEnvironment: Array<PoSelectOption> = [];
    optionsAutomatic: Array<PoSelectOption> = [];

    metadados: any;
    isPageEdit: boolean;
    isPageDetail: boolean;
    isPageCopy: boolean;

    id: string;
    siteDesc: string;

    manifestationParameters: IManifestationParameters = ManifestationParameters.empty();
    manifestationSubscription$: Subscription;
    siteSubscription$: Subscription;

    literals: any = {};

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private poI18nPipe: PoI18nPipe,
        private poI18nService: PoI18nService,
        private poNotification: PoNotificationService,
        private serviceManifestation: ManifestationParametersService,
        public serviceSite: EstablishmentsPublicService
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
            this.isPageEdit = this.activatedRoute.snapshot.url && this.activatedRoute.snapshot.url[0].path === 'edit';
            this.isPageDetail = this.activatedRoute.snapshot.url && this.activatedRoute.snapshot.url[0].path === 'detail';
            this.isPageCopy = this.activatedRoute.snapshot.url && this.activatedRoute.snapshot.url[0].path === 'copy';
            this.get();
            this.site.focus();
        });

    }

    zoomSiteFormat(value: IEstablishmentsPublic): string {
        return `${value.code} - ${value.name}`;
    }

    getSite(id: string): void {


        this.siteSubscription$ = this.serviceSite
            .getById(id)
            .subscribe((response: IEstablishmentsPublic) => {
                if (response) {
                    this.siteDesc = `${response.code} - ${response.name}`;
                }
            }, (err: any) => {
                this.siteDesc = '';
            });
    }
    private checkInteractionOnForm(form: NgForm): void {
        this.router.navigate(['./manifestationParameters']);
    }

    private get() {
        this.id = this.activatedRoute.snapshot.paramMap.get('siteId');
        if (this.id) {
            this.manifestationSubscription$ = this.serviceManifestation.getById(this.id).subscribe((item: IManifestationParameters) => {
                this.manifestationParameters = item;
            });
            this.searchMetadados(this.id);

            if (this.isPageCopy) {
                this.manifestationParameters.siteId = '';
            } else {
                this.getSite(this.id);
            }

        } else {
            this.manifestationParameters.environment = Environment.homologation;
            this.manifestationParameters.automaticManifestation = AutomaticManifestation.operationConfirmed;
        }
    }

    save(): void {
        if (this.isPageEdit) {
            this.manifestationSubscription$ = this.serviceManifestation
                .update(this.manifestationParameters)
                .subscribe(() => {

                    this.poNotification.success(this.literals['updatedMessage']);
                    this.router.navigate(['/manifestationParameters']);

                });
        } else {
            this.manifestationSubscription$ = this.serviceManifestation
                .create(this.manifestationParameters)
                .subscribe(() => {

                    this.poNotification.success(this.literals['createdMessage']);
                    this.router.navigate(['/manifestationParameters']);

                });
        }
    }

    private setupComponents() {
        this.optionsAutomatic = [
            { label: this.literals['confirmOperation'], value: 1 },
            { label: this.literals['awareOperation'], value: 2 }
        ];
        this.optionsEnvironment = [
            { label: this.literals['homologation'], value: 2 },
            { label: this.literals['production'], value: 1 }
        ];
        this.editActions = [
            {
                label: this.literals['save'],
                action: this.save.bind(this, this.manifestationParameters)
            },
            {
                label: this.literals['return'],
                action: this.checkInteractionOnForm.bind(this)
            }
        ];

        this.newActions = [
            {
                label: this.literals['save'],
                action: this.save.bind(this),
                icon: 'po-icon-plus',
            },
            {
                label: this.literals['return'],
                action: this.checkInteractionOnForm.bind(this)
            }
        ];

        this.detailActions = [
            {
                label: this.literals['return'],
                action: this.checkInteractionOnForm.bind(this)
            }
        ];

        this.editBreadcrumb = {
            items: [
                {
                    label: this.literals['manifestationParameters'],
                    link: '/manifestationParameters'
                },
                {
                    label: this.literals['edit'],
                    link: '/manifestationParameters/edit'
                }
            ]
        };

        this.copyBreadcrumb = {
            items: [
                {
                    label: this.literals['manifestationParameters'],
                    link: '/manifestationParameters'
                },
                {
                    label: this.literals['copy'],
                    link: '/manifestationParameters/edit'
                }
            ]
        };

        this.newBreadcrumb = {
            items: [
                {
                    label: this.literals['manifestationParameters'],
                    link: '/manifestationParameters'
                },
                {
                    label: this.literals['add'],
                    link: '/manifestationParameters/new'
                }
            ]
        };
        this.detailBreadcrumb = {
            items: [
                {
                    label: this.literals['manifestationParameters'],
                    link: '/manifestationParameters'
                },
                {
                    label: this.literals['detail'],
                    link: '/manifestationParameters/detail'
                }
            ]
        };

        this.zoomSiteColumns = [
            { property: 'code', label: this.literals['siteId'], type: 'string' },
            { property: 'name', label: this.literals['siteName'], type: 'string' }
        ];

    }

    onSelected(establishments: IEstablishmentsPublic) {
        this.searchMetadados(establishments.code);
        if (this.isPageCopy) {
            this.manifestationParameters.siteId = '';
        }
    }

    disableFields() {
        if (this.activatedRoute.snapshot.url[0].path !== 'detail') {
            return false;
        } else {
            return true;
        }
    }

    breadCrumb(): PoBreadcrumb {
        switch (this.activatedRoute.snapshot.url[0].path) {
            case 'edit':
                return this.editBreadcrumb;
                break;
            case 'detail':
                return this.detailBreadcrumb;
                break;
            case 'copy':
                return this.copyBreadcrumb;
                break;
            default:
                return this.newBreadcrumb;
                break;
        }
    }

    titlePage(): string {
        switch (this.activatedRoute.snapshot.url[0].path) {
            case 'edit':
                return this.literals['editManifestationParameters'];
                break;
            case 'detail':
                return this.literals['detailManifestationParameters'];
                break;
            case 'copy':
                return `${this.literals['copyManifestationParameters']} ${this.id}`;
                break;
            default:
                return this.literals['addNewManifestationParameters'];
                break;
        }

    }

    pageActions() {
        switch (this.activatedRoute.snapshot.url[0].path) {
            case 'edit':
                return this.editActions;
                break;
            case 'detail':
                return this.detailActions;
                break;
            default:
                return this.newActions;
                break;
        }

    }

    searchMetadados(id: string) {
        this.serviceManifestation.getMetadados(id).subscribe((metad: any) => {
            this.metadados = metad;
        });
    }
    ngOnDestroy(): void {
        if (this.manifestationSubscription$) { this.manifestationSubscription$.unsubscribe(); }
        if (this.siteSubscription$) { this.siteSubscription$.unsubscribe(); }
    }
}
