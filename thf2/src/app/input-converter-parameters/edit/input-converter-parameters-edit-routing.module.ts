import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputConverterParametersEditComponent } from './input-converter-parameters-edit.component';

const routes: Routes = [
  {
    path: '',
    component: InputConverterParametersEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputConverterParametersEditRoutingModule { }
