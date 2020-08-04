export interface IReplicationData {
    entityName: string;          // Entidade que está sendo realizada a exportação
    listSiteCode: Array<string>; // lista de código de estabelecimento marcados
    exportSiteAll: boolean;      // exportar todos os estabelecimento
    confirmationExport: boolean; // confirma exportação
    onlyFieldsChanged: boolean;  // somente campos alterados
    previousContent: boolean;    // conforme conteúdo anterior
    listItemCode: Array<string>; // lista de item que deverão ser gerados -Opcional
    exportItemCodeAll: boolean;  // exportar todos os itens
    exportItem: boolean;         // Exporta item recebimento
    exportSiteItem: boolean;      // Exporta item recebimento estabelecimento
    exportSiteFamily: boolean;   // Exporta família recebimento
    entityOld: any;              // valor antigos da entidade
    waitExecution: boolean;      // aguardar execução


}

export class ReplicationData implements IReplicationData {

    entityName: string;          // Entidade que está sendo realizada a exportação
    listSiteCode: Array<string>; // lista de código de estabelecimento marcados
    exportSiteAll: boolean;      // exportar todos os estabelecimento
    confirmationExport: boolean; // confirma exportação
    onlyFieldsChanged: boolean;  // somente campos alterados
    previousContent: boolean;    // conforme conteúdo anterior
    listItemCode: Array<string>; // lista de item que deverão ser gerados -Opcional
    exportItemCodeAll: boolean;  // exportar todos os itens
    exportItem: boolean;         // Exporta item recebimento
    exportSiteItem: boolean;      // Exporta item recebimento estabelecimento
    exportSiteFamily: boolean;   // Exporta família recebimento estabelecimento
    entityNew: any;              // valores atualizados  da entidade
    entityOld: any;              // valor antigos da entidade
    waitExecution: boolean;      // aguardar execução

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    static of(json: any = {}) {
        return new ReplicationData(json);
    }

    static empty() {
        return new ReplicationData();
    }

    static fromJson(json: Array<any> = []) {

        const items: Array<IReplicationData> = [];

        for (const values of json) {
            items.push(new ReplicationData(values));
        }

        return items;
    }


}
