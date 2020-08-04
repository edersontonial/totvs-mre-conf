import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReplicationDataFamilyComponent } from './replication-data-family.component';
const routes: Routes = [
    {
        path: '',
        component: ReplicationDataFamilyComponent,
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ReplicationDataFamilyRoutingModule { }
