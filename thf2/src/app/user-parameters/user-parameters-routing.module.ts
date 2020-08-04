import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserParametersListComponent } from './list/user-parameters-list.component';
import { UserParametersEditComponent } from './edit/user-parameters-edit.component';

const routes: Routes = [
  {
    path: '',
    component: UserParametersListComponent
  },
  {
    path: 'detail/:id',
    component: UserParametersEditComponent
  },
  {
    path: 'justDetail/:id', /* Para usuarios sem permissao no programa, somente consulta o seu usuario */
    component: UserParametersEditComponent
  },
  {
    path: 'new',
    component: UserParametersEditComponent
  },
  {
    path: 'edit/:id',
    component: UserParametersEditComponent
  },
  {
    path: 'copy/:id',
    component: UserParametersEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserParametersRoutingModule { }
