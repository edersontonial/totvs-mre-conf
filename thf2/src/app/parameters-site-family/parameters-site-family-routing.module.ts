import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParametersSiteFamilyEditComponent } from './edit/parameters-site-family.edit.component';
import { ParametersSiteFamilyListComponent } from './list/parameters-site-family.list.component';

const routes: Routes = [
    {
        path: '',
        component: ParametersSiteFamilyListComponent,
    },
    {
        path: 'edit/:id',
        component: ParametersSiteFamilyEditComponent
    },
    {
        path: 'detail/:id',
        component: ParametersSiteFamilyEditComponent
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ParametersSiteFamilyRoutingModule { }
