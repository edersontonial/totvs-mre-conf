import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { PoTableColumn, PoI18nService } from '@po-ui/ng-components';
import { Subscription, forkJoin } from 'rxjs';

import { TotvsResponse } from 'dts-backoffice-util';
import { IReplicationData, ReplicationData } from '../../model/replication-data.model';
import { DataService } from '../../services/service-data.service';
import { IEstablishmentsPublic } from '../../model/establishments-public.model';
import { GenericService } from '../../services/generic.service';


@Component({
  selector: 'app-replication-list-site',
  templateUrl: './replication-list-site.component.html'
})
export class ReplicationListSiteComponent implements OnInit, OnDestroy {
  @Input() replicationDataParam: IReplicationData = new ReplicationData();
  @Output() updateValue = new EventEmitter();

  literals: any = {};
  columns: Array<PoTableColumn>;
  hasNext = false;
  currentPage = 0;
  keyCode: string;

  isLoading = true;

  siteItems: Array<any> = new Array<any>();
  items: Array<any> = new Array<any>();
  genericSubscription$: Subscription;

  constructor(
    private poI18nService: PoI18nService,
    private genericService: GenericService,
    private dataService: DataService) { }

  ngOnInit(): void {

    forkJoin([
      this.poI18nService.getLiterals(),
      this.poI18nService.getLiterals({ context: 'replicationData' })]
    ).subscribe(literals => {
      literals.map(item => Object.assign(this.literals, item));
      this.replicationDataParam.listSiteCode = [];
      this.setupComponents();
      this.search();
    });
  }

  onAllUnselected(listSite: IEstablishmentsPublic) {

    Object.keys(listSite).forEach((key) => {
      this.replicationDataParam.listSiteCode.splice(this.replicationDataParam.listSiteCode.indexOf(listSite[key].site), 1);
    });
    this.updateValue.emit(this.replicationDataParam);
  }

  onAllSelected(listSite: IEstablishmentsPublic) {

    Object.keys(listSite).forEach((key) => {
      if (this.replicationDataParam.listSiteCode.indexOf(listSite[key].site) === -1) {
        this.replicationDataParam.listSiteCode.push(listSite[key].site);
      }
    });
    this.replicationDataParam.exportSiteAll = false;
    this.updateValue.emit(this.replicationDataParam);
  }

  onUnselected(site: any) {
    this.replicationDataParam.listSiteCode.splice(this.replicationDataParam.listSiteCode.indexOf(site.site), 1);
    this.updateValue.emit(this.replicationDataParam);
  }

  onSelected(site: any) {
    if (this.replicationDataParam.listSiteCode.indexOf(site.site) === -1) {
      this.replicationDataParam.listSiteCode.push(site.site);
      this.replicationDataParam.exportSiteAll = false;
      this.updateValue.emit(this.replicationDataParam);
    }
  }

  onChange(eventExportSiteAll) {

    this.replicationDataParam.exportSiteAll = eventExportSiteAll;
    this.updateValue.emit(this.replicationDataParam);

  }

  private setupComponents(): void {
    this.columns = [
      {
        property: 'site', label: this.literals.siteCode, type: 'string'
      },
      {
        property: 'siteName', label: this.literals.description, type: 'string'
      }
    ];

  }

  search(loadMore = false): void {


    this.keyCode = this.dataService.getValueKey();
    if (this.keyCode === '') {
      this.keyCode = '\'\'';
    }

    if (loadMore === true) {
      this.currentPage = this.currentPage + 1;
    } else {
      this.items = [];
      this.currentPage = 1;
    }
    this.isLoading = true;
    this.genericSubscription$ = this.genericService
      .getByKey(this.dataService.geApitUrl(), `${this.dataService.getNameKey()}=${this.keyCode}`, [])
      .subscribe((response: TotvsResponse<any>) => {
        this.siteItems = [...this.siteItems, ...response.items];
        this.hasNext = response.hasNext;
        this.isLoading = false;
      });
  }
  ngOnDestroy(): void {
    if (this.genericSubscription$) { this.genericSubscription$.unsubscribe(); }
  }
}
