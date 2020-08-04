import { Component, OnInit, Input } from '@angular/core';
import { PoNotificationService, PoSelectOption, PoI18nService, PoPageAction, PoLookupColumn } from '@po-ui/ng-components';
import { forkJoin } from 'rxjs';
import { ReceivingParameters, IReceivingParameters } from '../../shared/model/receiving-parameters.model';
import { ReceivingParametersService } from '../../shared/services/receiving-parameters.service';
import { SeriesService } from '../../shared/services/series.service';
import { SeriesZoom } from '../../shared/zoom/series.zoom';

@Component({
  selector: 'app-receiving-parameters',
  templateUrl: './receiving-parameters.component.html'
})
export class ReceivingParametersComponent implements OnInit {

  @Input() isDetail: string;

  literals: any = {};
  parameters: IReceivingParameters = new ReceivingParameters();
  pageActions: Array<PoPageAction>;

  generationTypeForAccountsPayableOptions: Array<PoSelectOption> = [];
  serieslookupColumns: Array<PoLookupColumn>;

  metadados: any;

  constructor(
    public notification: PoNotificationService,
    public service: ReceivingParametersService,
    private poI18nService: PoI18nService,
    private poNotification: PoNotificationService,
    public seriesService: SeriesService
  ) { }

  ngOnInit(): void {
    forkJoin(
      [
        this.poI18nService.getLiterals(),
        this.poI18nService.getLiterals({ context: 'receivingParameters' })
      ]
    ).subscribe(literals => {
      literals.map(item => Object.assign(this.literals, item));
      this.setupComponents();
      this.search();
    });
  }

  setupComponents() {
    this.generationTypeForAccountsPayableOptions = [
      { label: this.literals.integrates, value: 1 },
      { label: this.literals.export, value: 2 }
    ];

    this.pageActions = [
      {
        label: this.literals.save,
        action: () => this.save()
      }
    ];

    this.serieslookupColumns = SeriesZoom.getZoomColumnsMI(this.literals);
  }

  save() {
    this.service.update(this.parameters).subscribe((item: IReceivingParameters) => {
      this.parameters = item;
      this.searchMetadados();
      this.poNotification.success(this.literals.updatedMessage);
    }, (err: any) => {
    });
  }

  search() {
    this.searchMetadados();

    this.service.get().subscribe((item: IReceivingParameters) => {
      this.parameters = item;
      this.changeUsesSeries();
    });
  }

  searchMetadados() {
    this.service.getMetadados().subscribe((metad: any) => {
      this.metadados = metad;
    });
  }

  changeUsesMultipleNatures() {
    if (this.parameters.usesMultipleNatures) {
      this.poNotification.warning(this.literals.helpUsesMultipleNatures);
    }
  }

  changePhysicalReceipt() {
    if (this.parameters.physicalReceipt === false) {
      this.parameters.accountingForCountDifference = false;
    }
  }

  changeUsesSeries() {
    if (this.parameters.usesSeries) {
      this.parameters.defaultSeries = '';
    }
    if (this.metadados) {
      this.metadados.defaultSeries.disabled = this.parameters.usesSeries;
    }
  }

}
