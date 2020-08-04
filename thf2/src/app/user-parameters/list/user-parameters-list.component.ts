import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import {
  PoDisclaimer, PoPageAction, PoDisclaimerGroup,
  PoPageFilter, PoI18nPipe, PoI18nService, PoNotificationService, PoDialogService
} from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { UserParametersService } from '../../shared/services/user-parameters.service';
import { IUserParameters } from '../../shared/model/user-parameters.model';
import { TotvsResponse } from '../../shared/interfaces/totvs-response.interface';

@Component({
  selector: 'app-user-parameters-list',
  templateUrl: './user-parameters-list.component.html'
})
export class UserParametersListComponent implements OnInit, OnDestroy {

  constructor(
    private poI18nPipe: PoI18nPipe,
    private poI18nService: PoI18nService,
    private poNotification: PoNotificationService,
    private poDialogService: PoDialogService,
    private router: Router,
    private service: UserParametersService
  ) { }

  private userSubscription$: Subscription;
  private disclaimers: Array<PoDisclaimer> = [];

  literals: any = {};
  pageActions: Array<PoPageAction>;
  tableActions: Array<PoPageAction>;
  quickSearchValue = '';
  readonly QUICK_SEARCH_STORAGE = 'mre.userParameters.quickSearchValue';

  disclaimerGroup: PoDisclaimerGroup;
  filterSettings: PoPageFilter;

  items: Array<any> = new Array<IUserParameters>();
  metadata: any;

  hasNext = false;
  pageSize = 20;
  currentPage = 0;
  isLoading = true;

  ngOnInit(): void {
    forkJoin([
      this.poI18nService.getLiterals()
    ]
    ).subscribe(literals => {
      literals.map(item => Object.assign(this.literals, item));
      this.getMetadata();
    });
  }

  getMetadata() {
    this.userSubscription$ = this.service.getMetadataList().subscribe((metad: any) => {
      this.metadata = metad;
      this.setupComponents();
      this.quickSearchValue = localStorage.getItem(this.QUICK_SEARCH_STORAGE);
      if (this.quickSearchValue) {
        this.quickSearch();
      } else {
        this.search();
      }
    });
  }

  private setupComponents(): void {

    this.pageActions = [
      {
        label: this.literals.add,
        action: () => this.router.navigate(['userParameters/new']), icon: 'po-icon-plus'
      },
    ];

    this.tableActions = [
      { action: this.edit.bind(this), label: this.literals.edit, icon: 'po-icon po-icon-edit' },
      { action: this.copy.bind(this), label: this.literals.copy, icon: 'po-icon po-icon-copy' },
      { action: this.detail.bind(this), label: this.literals.detail, icon: 'po-icon po-icon-document' },
      { action: this.delete.bind(this), label: this.literals.remove, icon: 'po-icon po-icon-delete' },
    ];

    this.disclaimerGroup = {
      title: this.literals.filters,
      disclaimers: [],
      change: this.onChangeDisclaimer.bind(this)
    };

    this.filterSettings = {
      action: 'quickSearch',
      ngModel: 'quickSearchValue',
      placeholder: this.literals.search
    };
  }

  quickSearch(filter = [{ property: 'search', value: this.quickSearchValue }]): void {
    this.disclaimers = [...filter];
    this.disclaimerGroup.disclaimers = [...this.disclaimers];
  }

  search(loadMore = false): void {
    const disclaimer = this.disclaimers || [];

    if (loadMore === true) {
      this.currentPage = this.currentPage + 1;
    } else {
      this.items = [];
      this.currentPage = 1;
    }

    this.isLoading = true;
    this.userSubscription$ = this.service
      .query(disclaimer, this.currentPage, this.pageSize)
      .subscribe((response: TotvsResponse<IUserParameters>) => {
        this.items = [...this.items, ...response.items];
        this.hasNext = response.hasNext;
        this.isLoading = false;
      });
  }

  private edit(item: IUserParameters): void {
    this.router.navigate(['/userParameters', 'edit', item.userCode]);
  }

  private copy(item: IUserParameters): void {
    this.router.navigate(['/userParameters', 'copy', item.userCode]);
  }

  private detail(item: IUserParameters): void {
    this.router.navigate(['/userParameters', 'detail', item.userCode]);
  }

  ngOnDestroy(): void {
    if (this.userSubscription$) {
      this.userSubscription$.unsubscribe();
    }
  }

  private resetFilters(): void {
    this.quickSearchValue = '';
  }

  private onChangeDisclaimer(disclaimers): void {
    this.disclaimers = disclaimers;
    if (this.disclaimers.length === 0) {
      this.resetFilters();
    }
    localStorage.setItem(this.QUICK_SEARCH_STORAGE, this.quickSearchValue);
    this.search();
  }

  private delete(item: IUserParameters): void {
    this.poDialogService.confirm({
      title: this.literals.remove,
      message: this.poI18nPipe.transform(this.literals.modalDeleteSingleMessage, [item.userCode]),
      confirm: () => {
        this.userSubscription$ = this.service.delete(item.userCode).subscribe(response => {
          this.poNotification.success(
            this.poI18nPipe.transform(
              this.literals.excludedMessage, [item.userCode]
            )
          );
          this.search();
        }, (err: any) => {
          this.search();
        });
      }
    });
  }
}
