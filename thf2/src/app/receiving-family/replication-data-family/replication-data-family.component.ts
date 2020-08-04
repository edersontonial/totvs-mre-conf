
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import {
    PoI18nService, PoNotificationService, PoPageAction,
    PoBreadcrumb, PoStepperStatus, PoStepperItem
} from '@po-ui/ng-components';

import { forkJoin, Subscription } from 'rxjs';
import { IReplicationData, ReplicationData } from '../../shared/model/replication-data.model';
import { DataService } from '../../shared/services/service-data.service';
import { ReplicationDataFamilyService } from 'src/app/shared/services/replication-data-family.service';

@Component({
    selector: 'app-replication-data-family',
    templateUrl: './replication-data-family.component.html'
})
export class ReplicationDataFamilyComponent implements OnInit, OnDestroy {
    @ViewChild('stepCopy', { static: true }) stepCopy: PoStepperItem;
    @ViewChild('stepParameter', { static: true }) stepParameter: PoStepperItem;
    @ViewChild('stepTargetSite', { static: true }) stepTargetSite: PoStepperItem;
    @ViewChild('stepItem', { static: true }) stepItem: PoStepperItem;
    @ViewChild('stepEnd', { static: true }) stepEnd: PoStepperItem;

    literals: any = {};
    replicationData: IReplicationData = ReplicationData.empty();
    status: PoStepperStatus = PoStepperStatus.Done;

    key: any;
    pageActions: Array<PoPageAction>;
    Breadcrumb: PoBreadcrumb;
    replicationDataFamilyService$: Subscription;


    constructor(
        private router: Router,
        private poNotification: PoNotificationService,
        private dataService: DataService,
        private poI18nService: PoI18nService,
        private replicationDataFamilyService: ReplicationDataFamilyService) { }

    ngOnInit(): void {

        forkJoin([
            this.poI18nService.getLiterals(),
            this.poI18nService.getLiterals({ context: 'replicationData' })]
        ).subscribe(literals => {
            literals.map(item => Object.assign(this.literals, item));
            this.setupComponents();
            this.setValeuInitial();
        });
    }

    private setupComponents(): void {
        this.pageActions = [
            {
                label: this.literals['cancel'],
                action: () => this.onCancel()
            }
        ];

        this.Breadcrumb = this.dataService.getBreadCrumb();
        this.Breadcrumb.items.push({
            label: this.literals['replica'],
            link: '/replicationData'
        });

    }
    private setValeuInitial(): void {
        this.replicationData.confirmationExport = true;
        this.replicationData.exportItemCodeAll = true;
        this.replicationData.exportSiteAll = true;
        this.replicationData.exportItem = true;
        this.replicationData.exportSiteItem = true;
        this.replicationData.exportSiteFamily = true;
    }

    onChangeReplicationData(event) {

        if (this.replicationData.exportSiteFamily === true &&
            this.replicationData.exportItem === false &&
            this.replicationData.exportSiteItem === false) {
            this.replicationData.confirmationExport = false;

            if (this.dataService.getOrigin() === 'edit') {
                this.dataService.setDisabledField('confirmationExport');
            }
        } else {
            this.replicationData.confirmationExport = true;
            this.dataService.setDisabledField('');
        }
        this.replicationData = event;
    }
    onConfirmStep(): void {
        this.replicationData.entityOld = this.dataService.getOldRecord();
        this.replicationDataFamilyService$ = this.replicationDataFamilyService
            .update(this.replicationData)
            .subscribe(() => {
                this.poNotification.success(this.literals['updatedMessage']);
                this.router.navigate([this.dataService.getRouteParent()]);
            });
    }

    onCopyStep(): void {
        if (this.dataService.getOrigin() === 'list' &&
            this.replicationData.exportSiteFamily === true &&
            this.replicationData.exportItem === false &&
            this.replicationData.exportSiteItem === false) {

            this.stepCopy.status = PoStepperStatus.Done;
            this.stepParameter.status = PoStepperStatus.Disabled;
            this.stepTargetSite.status = PoStepperStatus.Active;
            this.stepItem.status = PoStepperStatus.Default;
            this.stepEnd.status = PoStepperStatus.Disabled;
        } else {
            this.stepCopy.status = PoStepperStatus.Done;
            this.stepParameter.status = PoStepperStatus.Active;
            this.stepTargetSite.status = PoStepperStatus.Default;
            this.stepItem.status = PoStepperStatus.Disabled;
            this.stepEnd.status = PoStepperStatus.Disabled;
            
        }

    }
    onStepParamNext(): void {

        if (this.replicationData.confirmationExport) {
            this.stepCopy.status = PoStepperStatus.Done;
            this.stepParameter.status = PoStepperStatus.Done;
            this.stepTargetSite.status = PoStepperStatus.Disabled;
            this.stepItem.status = PoStepperStatus.Active;
            this.stepEnd.status = PoStepperStatus.Default;
            if (this.replicationData.exportSiteItem || this.replicationData.exportSiteFamily) {
                this.allStep();
            }
        } else {
            if (this.replicationData.exportSiteItem || this.replicationData.exportSiteFamily) {
                this.allStep();
            } else {
                this.stepCopy.status = PoStepperStatus.Done;
                this.stepParameter.status = PoStepperStatus.Done;
                this.stepTargetSite.status = PoStepperStatus.Disabled;
                this.stepItem.status = PoStepperStatus.Disabled;
                this.stepEnd.status = PoStepperStatus.Active;
            }
        }
    }
    onStepTargetSitePrevious(): void {
        if (this.dataService.getOrigin() === 'list' &&
            this.replicationData.exportSiteFamily === true &&
            this.replicationData.exportItem === false &&
            this.replicationData.exportSiteItem === false) {
            this.stepCopy.status = PoStepperStatus.Active;
            this.stepParameter.status = PoStepperStatus.Disabled;
            this.stepTargetSite.status = PoStepperStatus.Done;
            this.stepItem.status = PoStepperStatus.Disabled;
            this.stepEnd.status = PoStepperStatus.Disabled;
        } else {
            this.stepCopy.status = PoStepperStatus.Default;
            this.stepParameter.status = PoStepperStatus.Active;
            this.stepTargetSite.status = PoStepperStatus.Done;
            this.stepItem.status = PoStepperStatus.Disabled;
            this.stepEnd.status = PoStepperStatus.Disabled;
        }
    }
    onStepTargetSiteNext(): void {
        if (this.replicationData.confirmationExport) {
            this.activeItemStep();

        } else {
            if (this.replicationData.exportItem) {
                this.disableItemAndSiteStep();
            }
            if (this.replicationData.exportSiteItem || this.replicationData.exportSiteFamily) {
                this.stepCopy.status = PoStepperStatus.Done;
                this.stepParameter.status = PoStepperStatus.Done;
                this.stepTargetSite.status = PoStepperStatus.Done;
                this.stepItem.status = PoStepperStatus.Disabled;
                this.stepEnd.status = PoStepperStatus.Active;
            }
        }
        
    }

    onStepItemPrevious(): void {
        if (this.replicationData.confirmationExport) {
            if (this.replicationData.exportItem) {
                this.stepCopy.status = PoStepperStatus.Done;
                this.stepParameter.status = PoStepperStatus.Active;
                this.stepTargetSite.status = PoStepperStatus.Disabled;
                this.stepItem.status = PoStepperStatus.Default;
                this.stepEnd.status = PoStepperStatus.Disabled;
            }
            if (this.replicationData.exportSiteItem || this.replicationData.exportSiteFamily) {
                this.allStep();
            }
        } else {
            if (this.replicationData.exportItem) {
                this.allStep();
            }
            if (this.replicationData.exportSiteItem || this.replicationData.exportSiteFamily) {
                this.activeItemStep();
            }
        }
    }

    onStepEndPrevious(): void {
        if (this.replicationData.confirmationExport) {

            this.stepCopy.status = PoStepperStatus.Done;
            this.stepParameter.status = PoStepperStatus.Done;
            this.stepTargetSite.status = PoStepperStatus.Default;
            this.stepItem.status = PoStepperStatus.Active;
            this.stepEnd.status = PoStepperStatus.Disabled;

        } else {
            if (this.replicationData.exportItem) {
                this.disableItemAndSiteStep();
            }
            if (this.replicationData.exportSiteItem || this.replicationData.exportSiteFamily) {
                this.stepCopy.status = PoStepperStatus.Done;
                this.stepParameter.status = PoStepperStatus.Done;
                this.stepTargetSite.status = PoStepperStatus.Active;
                this.stepItem.status = PoStepperStatus.Disabled;
                this.stepEnd.status = PoStepperStatus.Default;
            }
        }
    }
    disableItemAndSiteStep(): void {
        this.stepCopy.status = PoStepperStatus.Done;
        this.stepParameter.status = PoStepperStatus.Active;
        this.stepTargetSite.status = PoStepperStatus.Disabled;
        this.stepItem.status = PoStepperStatus.Disabled;
        this.stepEnd.status = PoStepperStatus.Default;

    }
    activeItemStep(): void {
        this.stepCopy.status = PoStepperStatus.Done;
        this.stepParameter.status = PoStepperStatus.Done;
        this.stepTargetSite.status = PoStepperStatus.Done;
        this.stepItem.status = PoStepperStatus.Active;
        this.stepEnd.status = PoStepperStatus.Default;
    }
    allStep(): void {
        this.stepCopy.status = PoStepperStatus.Done;
        this.stepParameter.status = PoStepperStatus.Done;
        this.stepTargetSite.status = PoStepperStatus.Active;
        this.stepItem.status = PoStepperStatus.Default;
        this.stepEnd.status = PoStepperStatus.Disabled;
    }

    onCancel(): void {
        this.router.navigate([this.dataService.getRoute()]);

    }
    ngOnDestroy(): void {
        if (this.replicationDataFamilyService$) { this.replicationDataFamilyService$.unsubscribe(); }
    }
}
