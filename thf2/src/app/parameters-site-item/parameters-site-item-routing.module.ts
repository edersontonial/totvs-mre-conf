import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParametersSiteItemEditComponent } from './edit/parameters-site-item.edit.component';
import { ParametersSiteItemListComponent } from './list/parameters-site-item.list.component';


const routes: Routes = [
    {
        path: '',
        component: ParametersSiteItemListComponent,
    },
    {
        path: 'new',
        component: ParametersSiteItemEditComponent
    },
    {
        path: 'edit/:id',
        component: ParametersSiteItemEditComponent
    },
    {
        path: 'detail/:id',
        component: ParametersSiteItemEditComponent
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ParametersSiteItemRoutingModule { }
