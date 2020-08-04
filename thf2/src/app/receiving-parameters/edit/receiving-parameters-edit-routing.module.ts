import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceivingParametersEditComponent } from './receiving-parameters-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ReceivingParametersEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceivingParametersEditRoutingModule { }
