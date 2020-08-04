import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import {
    PoPageAction,
    PoI18nService,
    PoNotificationService,
    PoAccordionItemComponent
} from '@po-ui/ng-components';

import { IUserParameters, UserParameters } from '../../shared/model/user-parameters.model';
import { UserParametersService } from '../../shared/services/user-parameters.service';

@Component({
    selector: 'app-user-parameters-edit',
    templateUrl: './user-parameters-edit.component.html'
})
export class UserParametersEditComponent implements OnInit, OnDestroy {

    @ViewChild('enableDisableFields', { static: true }) enableDisableFields: PoAccordionItemComponent;
    @ViewChild('updateConfigurations', { static: true }) updateConfigurations: PoAccordionItemComponent;

    private userSubscription$: Subscription;
    userParameters: IUserParameters = UserParameters.empty();
    id: string;
    event: string;

    literals: any = {};
    metadata: any;
    readonly ROUTE = '/userParameters';

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private poI18nService: PoI18nService,
        private poNotification: PoNotificationService,
        private service: UserParametersService
    ) { }

    ngOnInit(): void {
        forkJoin([
            this.poI18nService.getLiterals()
        ]
        ).subscribe(literals => {
            literals.map(item => Object.assign(this.literals, item));
            this.defineEventAndId();
            this.search();
            this.enableDisableFields.expand();
        });
    }

    private defineEventAndId() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        this.event = this.activatedRoute.snapshot.url[0].path;
        if (this.event === 'justDetail') { /* Quando o usuario soh tem permissao de consulta */
            this.event = 'detail';
        }
    }

    private search() {
        this.userSubscription$ = this.service.getMetadata(this.event, this.id).subscribe((metad: any) => {
            this.metadata = metad;
            if (this.id) {
                this.get();
            }
        });
    }

    private get() {
        this.userSubscription$ = this.service.getById(this.id).subscribe((item: IUserParameters) => {
            this.userParameters = item;
            if (!this.userParameters.updateQuantitiesRMA) {
                this.userParameters.updateRMA = false;
            }
            if (this.isCopy()) {
                this.userParameters.userCode = '';
            }
        });
    }

    private create() {
        this.adjustNumberFields();
        this.userSubscription$ = this.service.create(this.userParameters).subscribe(() => {
            this.return();
            this.poNotification.success(this.literals.createdMessage);
        });
    }

    private update() {
        this.adjustNumberFields();
        this.userSubscription$ = this.service.update(this.userParameters).subscribe(() => {
            this.return();
            this.poNotification.success(this.literals.updatedMessage);
        });
    }

    private adjustNumberFields() {
        this.userParameters.shipToDatePermissionVariation = Number(this.userParameters.shipToDatePermissionVariation);
        this.userParameters.variationIssuing = Number(this.userParameters.variationIssuing);
        this.userParameters.variationUpdated = Number(this.userParameters.variationUpdated);
        this.userParameters.firstItemSequence = Number(this.userParameters.firstItemSequence);
        this.userParameters.sequenceIncrease = Number(this.userParameters.sequenceIncrease);
    }

    private return(): void {
        this.router.navigate([this.ROUTE]);
    }

    clickFolderTyping() {
        if (!this.enableDisableFields.expanded) {
            this.enableDisableFields.expand();
        }
    }

    clickFolderUpdate() {
        if (!this.updateConfigurations.expanded) {
            this.updateConfigurations.expand();
        }
    }

    getActions(): Array<PoPageAction> {
        switch (this.event) {
            case 'edit': {
                return this.editActions();
            }
            case 'detail': {
                return this.detailActions();
            }
            case 'justDetail': {
                return undefined;
            }
            case 'copy': {
                return this.newActions();
            }
        }
        return this.newActions();
    }

    editActions(): Array<PoPageAction> {
        return [
            {
                label: this.literals.save,
                action: this.update.bind(this, this.userParameters),
            },
            {
                label: this.literals.return,
                action: this.return.bind(this)
            }
        ];
    }

    detailActions(): Array<PoPageAction> {
        return [
            {
                label: this.literals.return,
                action: this.return.bind(this)
            }
        ];
    }

    newActions(): Array<PoPageAction> {
        return [
            {
                label: this.literals.save,
                action: this.create.bind(this),
                icon: 'po-icon-plus'
            },
            {
                label: this.literals.return,
                action: this.return.bind(this)
            }
        ];
    }

    isJustDetail(): boolean {
        return this.activatedRoute.snapshot.url[0].path === 'justDetail';
    }

    isCopy(): boolean {
        return this.activatedRoute.snapshot.url[0].path === 'copy';
    }

    ngOnDestroy(): void {
        if (this.userSubscription$) {
            this.userSubscription$.unsubscribe();
        }
    }
}
