import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'parameterCenter', /* Central de parâmetros */
        redirectTo: '' /* após carregar o menu será redirecionado automaticamente para o primeiro item do menu */
    },
    {
        path: 'receivingParametersEdit', /* Manutenção de parâmetros do Recebimento RE0103 */
        loadChildren: './receiving-parameters/edit/receiving-parameters-edit.module#ReceivingParametersEditModule'
    },
    {
        path: 'receivingParametersDetail', /* Consulta de parâmetros do Recebimento */
        loadChildren: './receiving-parameters/detail/receiving-parameters-detail.module#ReceivingParametersDetailModule'
    },
    {
        path: 'inputConverterParametersEdit',
        loadChildren: './input-converter-parameters/edit/input-converter-parameters-edit.module#InputConverterParametersEditModule'
    },
    {
        path: 'inputConverterParametersDetail',
        loadChildren: './input-converter-parameters/detail/input-converter-parameters-detail.module#InputConverterParametersDetailModule'
    },
    {
        path: 'manifestationParameters', /* Parâmetros Manifestação Destinatário */
        loadChildren: './manifestation-parameters/manifestation-parameters.module#ManifestationParametersModule'
    },
    {
        path: 'userParameters', /* Parâmetros do Usuário do Recebimento */
        loadChildren: './user-parameters/user-parameters.module#UserParametersModule'
    },
    {
        path: 'receivingFamily',  /* Família Recebimento */
        loadChildren: './receiving-family/receiving-family.module#ReceivingFamilyModule'
    },
    {
        path: 'parametersSiteFamily',  /* Família Estabelecimento */
        loadChildren: './parameters-site-family/parameters-site-family.module#ParametersSiteFamilyModule'
    },
    {
        path: 'parametersSiteItem',  /* Itens do Estabelecimento */
        loadChildren: './parameters-site-item/parameters-site-item.module#ParametersSiteItemModule'
    },
    {
        path: 'receivingItem',  /*Item Recebimento*/
        loadChildren: './receiving-item/receiving-item.module#ReceivingItemModule'

    },
    {
        path: 'replicationDataFamily',  /*Replicar dados Família*/
        loadChildren: './receiving-family/replication-data-family/replication-data-family.module#ReplicationDataFamilyModule'

    }

];

// Testar em outra língua
// localStorage.setItem('user.language', 'pt-BR');

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})

export class AppRoutingModule { }
