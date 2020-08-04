import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { PoTableColumn, PoI18nService } from '@po-ui/ng-components';
import { Subscription, forkJoin } from 'rxjs';

import { TotvsResponse } from 'dts-backoffice-util';
import { IReplicationData, ReplicationData } from '../../model/replication-data.model';
import { GenericService } from '../../services/generic.service';
import { DataService } from '../../services/service-data.service';
import { IProduct } from '../../model/product.model';


@Component({
  selector: 'app-replication-list-item',
  templateUrl: './replication-list-item.component.html'
})
export class ReplicationListItemComponent implements OnInit, OnDestroy {
  @Input() replicationDataParam: IReplicationData = new ReplicationData();
  @Output() updateValue = new EventEmitter();


  literals: any = {};
  columns: Array<PoTableColumn>;
  hasNext = false;
  currentPage = 0;
  keyCode: string;
  apiUrl = '/dts/datasul-rest/resources/prg/cdp/v1/product';

  isLoading = true;

  listItem: Array<any> = new Array<any>();
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
      this.setupComponents();
      this.search();
    });
  }

  onAllUnselected(listItem: IProduct) {

    Object.keys(listItem).forEach((key) => {
      this.replicationDataParam.listItemCode.splice(this.replicationDataParam.listItemCode.indexOf(listItem[key].product), 1);
    });
    this.updateValue.emit(this.replicationDataParam);
  }

  onAllSelected(listItem: IProduct) {

    this.replicationDataParam.listItemCode = [];
    Object.keys(listItem).forEach((key) => {
      if (this.replicationDataParam.listItemCode.indexOf(listItem[key].product) === -1) {
        this.replicationDataParam.listItemCode.push(listItem[key].product);
      }
    });
    this.replicationDataParam.exportItemCodeAll = false;
    this.updateValue.emit(this.replicationDataParam);
  }

  onUnselected(model: IProduct) {
    this.replicationDataParam.listItemCode.splice(this.replicationDataParam.listItemCode.indexOf(model.product), 1);
    this.updateValue.emit(this.replicationDataParam);
  }

  onSelected(model: IProduct) {
    if (this.replicationDataParam.listItemCode === undefined) {
      this.replicationDataParam.listItemCode = [];
    }
    if (this.replicationDataParam.listItemCode.indexOf(model.product) === -1) {
      this.replicationDataParam.listItemCode.push(model.product);
      this.replicationDataParam.exportItemCodeAll = false;
      this.updateValue.emit(this.replicationDataParam);
    }
  }

  onChange(eventExportItemCodeAll) {

    this.replicationDataParam.exportItemCodeAll = eventExportItemCodeAll;
    this.updateValue.emit(this.replicationDataParam);

  }

  private setupComponents(): void {
    this.columns = [
      {
        property: 'product', label: this.literals.product, type: 'string'
      },
      {
        property: 'productDescription', label: this.literals.description, type: 'string'
      }
    ];

  }

  search(loadMore = false): void {

    this.keyCode = this.dataService.getValueKey();
    if (this.keyCode !== undefined) {
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
        .getByKey(this.apiUrl, `advSearch&${this.dataService.getFieldSearchProduct()}=${this.keyCode};${this.keyCode}`, [])
        .subscribe((response: TotvsResponse<any>) => {
          this.listItem = [...this.listItem, ...response.items];
          this.hasNext = response.hasNext;
          this.isLoading = false;
        });
    }
  }
  ngOnDestroy(): void {
    if (this.genericSubscription$) { this.genericSubscription$.unsubscribe(); }
  }
}
