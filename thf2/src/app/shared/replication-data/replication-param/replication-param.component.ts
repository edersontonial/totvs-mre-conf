import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PoI18nService } from '@po-ui/ng-components';
import { IReplicationData, ReplicationData } from '../../model/replication-data.model';
import { DataService } from '../../services/service-data.service';


@Component({
    selector: 'app-replication-param',
    templateUrl: './replication-param.component.html'
})
export class ReplicationParamComponent implements OnInit {

    @Input() replicationDataParam: IReplicationData = new ReplicationData();
    @Output() updateValue = new EventEmitter();

    literals: any = {};
    disable: boolean;

    constructor(
        private poI18nService: PoI18nService,
        private dataService: DataService
    ) { }


    ngOnInit(): void {

        forkJoin([
            this.poI18nService.getLiterals(),
            this.poI18nService.getLiterals({ context: 'replicationData' })]
        ).subscribe(literals => {
            literals.map(item => Object.assign(this.literals, item));
            this.setupComponents();
        });
    }


    onChangedConfirmationExport(eventConfirmationExport) {

        this.replicationDataParam.confirmationExport = eventConfirmationExport;
        this.updateValue.emit(this.replicationDataParam);

    }
    onChangedOnlyUpdateFields(eventOnlyUpdateFields) {
        this.replicationDataParam.onlyFieldsChanged = eventOnlyUpdateFields;
        this.updateValue.emit(this.replicationDataParam);
    }
    onChangedPreviousContent(eventPreviousContent) {
        this.replicationDataParam.previousContent = eventPreviousContent;
        this.updateValue.emit(this.replicationDataParam);
    }

    private setupComponents(): void {

        this.replicationDataParam.confirmationExport = true;
        this.replicationDataParam.onlyFieldsChanged = false;
        this.replicationDataParam.previousContent = false;
        if (this.dataService.getDisabledField() === 'confirmationExport') {
            this.replicationDataParam.confirmationExport = false;
        }

    }

    disabledConfirmation(): boolean {
        return (this.dataService.getDisabledField() === 'confirmationExport');
    }

    disabled(): boolean {
        if (this.dataService != null && this.dataService !== undefined &&
            this.dataService.getOrigin() != null && this.dataService.getOrigin().valueOf() !== undefined) {
            return (this.dataService.getOrigin().valueOf() === 'list');
        } else {
            return false;
        }
    }

}
