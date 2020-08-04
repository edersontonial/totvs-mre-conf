import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PoI18nService } from '@po-ui/ng-components';
import { forkJoin } from 'rxjs';
import { IReplicationData, ReplicationData } from '../../model/replication-data.model';

@Component({
  selector: 'app-replication-end',
  templateUrl: './replication-end.component.html'
})
export class ReplicationEndComponent implements OnInit {
  @Input() replicationDataParam: IReplicationData = new ReplicationData();
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
}
