import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PoModule, PoI18nPipe } from '@po-ui/ng-components';
import { LoadingInterceptorModule } from '../../loading-interceptor.module';
import { ReplicationDataFamilyRoutingModule } from './replication-data-family-routing.module';
import { ReplicationDataFamilyComponent } from './replication-data-family.component';
import { ReplicationListSiteComponent } from '../../shared/replication-data/replication-list-site/replication-list-site.component';
import { ReplicationListItemComponent } from '../../shared/replication-data/replication-list-item/replication-list-item.component';
import { ReplicationParamComponent } from '../../shared/replication-data/replication-param/replication-param.component';
import { ReplicationTablesComponent } from '../../shared/replication-data/replication-tables/replication-tables.component';
import { ReplicationEndComponent } from '../../shared/replication-data/replication-end/replication-end.component';
import { GenericService } from '../../shared/services/generic.service';
import { ReplicationDataFamilyService } from 'src/app/shared/services/replication-data-family.service';


@NgModule({
  imports: [
      CommonModule,
      LoadingInterceptorModule,
      PoModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      ReplicationDataFamilyRoutingModule
  ],
  declarations: [
      ReplicationDataFamilyComponent,
      ReplicationListSiteComponent,
      ReplicationListItemComponent,
      ReplicationParamComponent,
      ReplicationTablesComponent,
      ReplicationEndComponent
   ],
  exports: [
    ReplicationDataFamilyComponent
  ],
  providers: [
      PoI18nPipe,
      ReplicationDataFamilyService,
      GenericService
  ],
})
export class ReplicationDataFamilyModule { }
