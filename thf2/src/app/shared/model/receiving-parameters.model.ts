export interface IReceivingParameters {
    generationTypeForAccountsPayable: number;
    wmsIntegration: boolean;
    physicalReceipt: boolean;
    accountingForCountDifference: boolean;
    usesMultipleNatures: boolean;
    validatesAccountingAccounts: boolean;
    suggestDuplicateWithHoldingTax: boolean;
    usesFASBCurrencyTransactionDate: boolean;
    accountingGFEIntegration: boolean;
    usesRGA: boolean;
    usesSeries: boolean;
    defaultSeries: string;
    differentRemittanceCurrencyOrder: boolean;
    expensesAsProductCost: boolean;
    taxAsProductCost: boolean;
}

export class ReceivingParameters implements IReceivingParameters {
    generationTypeForAccountsPayable: number;
    wmsIntegration: boolean;
    physicalReceipt: boolean;
    accountingForCountDifference: boolean;
    usesMultipleNatures: boolean;
    validatesAccountingAccounts: boolean;
    suggestDuplicateWithHoldingTax: boolean;
    usesFASBCurrencyTransactionDate: boolean;
    accountingGFEIntegration: boolean;
    usesRGA: boolean;
    usesSeries: boolean;
    defaultSeries: string;
    differentRemittanceCurrencyOrder: boolean;
    expensesAsProductCost: boolean;
    taxAsProductCost: boolean;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    static of(json: any = {}) {
        return new ReceivingParameters(json);
    }

    static empty() {
        return new ReceivingParameters();
    }

    static fromJson(json: Array<any> = []) {

        const items: Array<IReceivingParameters> = [];

        for (const values of json) {
            items.push(new ReceivingParameters(values));
        }

        return items;
    }

}
