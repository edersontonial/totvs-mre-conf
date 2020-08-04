import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReceivingItemEditComponent } from './edit/receiving-item.edit.component';
import { ReceivingItemListComponent } from './list/receiving-item.list.component';

const routes: Routes = [
    {
        path: '',
        component: ReceivingItemListComponent,
    },
    {
        path: 'detail/:id',
        component: ReceivingItemEditComponent
    },
    {
        path: 'edit/:id',
        component: ReceivingItemEditComponent
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ReceivingItemRoutingModule { }
