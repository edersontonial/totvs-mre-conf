import { Component, OnInit, Input } from '@angular/core';
import { PoNotificationService, PoSelectOption, PoI18nPipe, PoI18nService, PoPageAction, PoTableColumn } from '@po-ui/ng-components';
import { InputConverterParametersService } from '../../shared/services/input-converter-parameters.service';
import { forkJoin } from 'rxjs';
import { InputConverterParameters, IInputConverterParameters } from '../../shared/model/input-converter-parameters.model';

@Component({
  selector: 'app-input-converter-parameters',
  templateUrl: './input-converter-parameters.component.html'
})
export class InputConverterParametersComponent implements OnInit {

  @Input() isDetail: string;

  literals: any = {};
  parameters: InputConverterParameters = new InputConverterParameters();
  pageActions: Array<PoPageAction>;

  receiveAtTAGxPedNFeOptions: Array<PoSelectOption> = [];
  duplicateGenerationAccordingToOptions: Array<PoSelectOption> = [];
  generationOfTaxesAccordingToOptions: Array<PoSelectOption> = [];
  metadados: any;

  taxesColumns: Array<PoTableColumn>;

  constructor(public notification: PoNotificationService,
              public service: InputConverterParametersService,
              private poI18nPipe: PoI18nPipe,
              private poI18nService: PoI18nService) { }

  ngOnInit(): void {
    forkJoin(
      [
        this.poI18nService.getLiterals(),
        this.poI18nService.getLiterals({ context: 'inputConverterParameters' })
      ]
    ).subscribe(literals => {
      literals.map(item => Object.assign(this.literals, item));
      this.setupComponents();
      this.search();
    });
  }

  setupComponents() {

    this.receiveAtTAGxPedNFeOptions = [
      { label: this.literals['purchaseorder'], value: 1 },
      { label: this.literals['purchaseReq'], value: 2 }
    ];
    this.duplicateGenerationAccordingToOptions = [
      { label: this.literals['XMLFile'], value: 1 },
      { label: this.literals['Receivement'], value: 2 }
    ];
    this.generationOfTaxesAccordingToOptions = [
      { label: this.literals['XMLFile'], value: 1 },
      { label: this.literals['Receivement'], value: 2 }
    ];

    this.pageActions = [
      {
        label: this.literals['save'],
        action: () => this.save()
      }
    ];
  }

  save() {
    this.service.update(this.parameters).subscribe((item: IInputConverterParameters) => {
      this.parameters = item;
      this.searchMetadados();
      this.notification.success(this.literals.updatedMessage);
    });
  }

  search() {

    this.searchMetadados();
    this.service.get().subscribe((item: IInputConverterParameters) => {
      this.parameters = item;
    });
  }

  searchMetadados() {

    this.service.getMetadados().subscribe((metadados: any) => {
      this.metadados = metadados;
    });
  }

  changeDuplicateGenerationAccordingTo() {
    if (this.parameters.duplicateGenerationAccordingTo === 1) {
        this.parameters.generateWithholdingTaxAutomatically = false;
    }
  }




}
