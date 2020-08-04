import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PoI18nService } from '@po-ui/ng-components';
import { forkJoin } from 'rxjs';
import { IReplicationData, ReplicationData } from '../../model/replication-data.model';

@Component({
  selector: 'app-replication-tables',
  templateUrl: './replication-tables.component.html'
})
export class ReplicationTablesComponent implements OnInit {
  @Input() replicationDataParam: IReplicationData = new ReplicationData();
  @Output() updateValue = new EventEmitter();

  literals: any = {};
  constructor(private poI18nService: PoI18nService) { }

  ngOnInit(): void {
    forkJoin([
      this.poI18nService.getLiterals(),
      this.poI18nService.getLiterals({ context: 'replicationData' })]
    ).subscribe(literals => {
      literals.map(item => Object.assign(this.literals, item));
     });
  }
  onChangedExportItem(eventExportItem) {

    this.replicationDataParam.exportItem = eventExportItem;
    this.updateValue.emit(this.replicationDataParam);

  }
  onChangedExportSiteItem(eventExportSiteItem) {
    this.replicationDataParam.exportSiteItem = eventExportSiteItem;
    this.updateValue.emit(this.replicationDataParam);
  }
  onChangedExportSiteFamily(eventSiteFamily) {
    this.replicationDataParam.exportSiteFamily = eventSiteFamily;
    this.updateValue.emit(this.replicationDataParam);
  }

}
