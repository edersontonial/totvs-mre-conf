import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManifestationParametersEditComponent } from './edit/manifestation-parameters.edit.component';
import { ManifestationParametersListComponent } from './list/manifestation-parameters.list.component';

const routes: Routes = [
    {
        path: '',
        component: ManifestationParametersListComponent,
    },
    {
        path: 'new',
        component: ManifestationParametersEditComponent,
    },
    {
        path: 'edit/:siteId',
        component: ManifestationParametersEditComponent,
    }
    ,
    {
        path: 'copy/:siteId',
        component: ManifestationParametersEditComponent,
    },
    {
        path: 'detail/:siteId',
        component: ManifestationParametersEditComponent,
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ManifestationParametersRoutingModule { }
