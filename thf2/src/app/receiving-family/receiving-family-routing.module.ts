import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReceivingFamilyEditComponent } from './edit/receiving-family.edit.component';
import { ReceivingFamilyListComponent } from './list/receiving-family.list.component';

const routes: Routes = [
    {
        path: '',
        component: ReceivingFamilyListComponent,
    },
    {
        path: 'edit/:familyCode',
        component: ReceivingFamilyEditComponent
    },
    {
        path: 'detail/:familyCode',
        component: ReceivingFamilyEditComponent
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ReceivingFamilyRoutingModule { }
