import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceivingParametersDetailComponent } from './receiving-parameters-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ReceivingParametersDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceivingParametersDetailRoutingModule { }
