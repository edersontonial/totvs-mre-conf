import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputConverterParametersDetailComponent } from './input-converter-parameters-detail.component';

const routes: Routes = [
  {
    path: '',
    component: InputConverterParametersDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputConverterParametersDetailRoutingModule { }
