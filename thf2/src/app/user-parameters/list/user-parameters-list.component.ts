import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserParametersService } from '../../shared/services/user-parameters.service';
import { PoPageDynamicTableActions } from '@po-ui/ng-templates';

@Component({
  selector: 'app-user-parameters-list',
  templateUrl: './user-parameters-list.component.html'
})
export class UserParametersListComponent implements OnInit, OnDestroy {

  //@Input() metadata: any;

  constructor(
    private router: Router,
    private service: UserParametersService
  ) { }

  private userSubscription$: Subscription;
  public dynamicPageActions: PoPageDynamicTableActions;
  public metadata: any;

  ngOnInit(): void {
    this.getMetadata();
  }

  getMetadata() {
    this.userSubscription$ = this.service.getMetadataList().subscribe((metad: any) => {
      this.metadata = metad;
      this.setupComponents();
    });
  }

  private setupComponents(): void {
    if (this.metadata.actions) {
      const beforeDuplicate = {
        beforeDuplicate: ((key: string, item: any) => { // sobrepoe o duplicate padrão
          this.router.navigate(['/userParameters', 'copy', key]);
          return { allowAction: false }; // não irá executar o duplicate padrao
        }),
      };
      this.dynamicPageActions = Object.assign(this.metadata.actions, beforeDuplicate);
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription$) {
      this.userSubscription$.unsubscribe();
    }
  }
}
