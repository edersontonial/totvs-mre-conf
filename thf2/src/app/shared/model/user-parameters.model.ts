export interface IUserParameters {
    userCode: string;
    userName: string;
    receiveWithVariance: boolean;
    adjustTotalPrice: boolean;
    enableState: boolean;
    updateAPAutomatically: boolean;
    updatesWithWarning: boolean;
    updatesWithError: boolean;
    enableStockMovement: boolean;
    itemReceiptCode: number;
    closePurchInstallments: boolean;
    updatesWithDuplicateError: boolean;
    defaultSpeciesExpenses: string;
    defaultSpeciesDuplic: string;
    defaultSpeciesDuplicNFF: string;
    updatesInventoryReconcilInvoices: boolean;
    sequenceIncrease: number;
    updateNFeInvalidDANFE: boolean;
    updateNFeAutomatically: boolean;
    updateOFInvalidNFe: boolean;
    updateQuantitiesRMA: boolean;
    updateRMA: boolean;
    verifyDivergTradeNotesVsPayTerm: boolean;
    enableDocOfVendorWithRestriction: boolean;
    creditNoteGeneration: boolean;
    enableBusinessUnit: boolean;
    sameSupplierMatrixOrder: boolean;
    enableAutomaticDuplicate: boolean;
    reverseCommission: boolean;
    proRateFIFOQuantityDifference: boolean;
    updateRIAutomatically: boolean;
    validatesAccountingAccounts: boolean;
    updateOFAutomatically: boolean;
    originIPIRate: number;
    enableICMSRate: boolean;
    enableIPIRate: boolean;
    enableICMSTaxationCode: boolean;
    enableIPITaxationCode: boolean;
    enableTaxClassification: boolean;
    enableItemExpenses: boolean;
    enableFiscalSpecies: boolean;
    enableSequence: boolean;
    enableTotalTaxes: boolean;
    itemDiscount: boolean;
    enablesAggregateItem: boolean;
    convertEntityQty: boolean;
    consistsUnitPrice: boolean;
    rateTotalDiscount: boolean;
    distribFunctFreight: number;
    reopenPurchInstallments: boolean;
    reopenCustomerOrder: boolean;
    receiveOtherVendorOrder: boolean;
    receiveWithoutOrder: boolean;
    firstItemSequence: number;
    roundUnitPrice: number;
    userDocsPermission: number;
    allowedVariation: number; // decimal
    variationUpdated: number;
    variationIssuing: number;
    shipToDatePermissionVariation: number;
    updateManifestAutomatically: boolean;
    enableAsynchronousValidationNFeCTe: boolean;
    enableIPIReductionPercentage: boolean;
    enableICMSReductionPercentage: boolean;
    enableToll: boolean;
    enableFIFOInPurchaseReq: boolean;
    considersValueInFIFO: boolean;
    enableDocumentExpenses: boolean;
    acceptableTaxDifference: number; // decimal
    consigReceiptValuation: number;
    enableLeasingContract: boolean;
    enableTaxConfiguratorForWithheldTaxes: boolean;
    backGFEAccountingIntegration: boolean;
    automaticBalanceAllocation: boolean;
    execGZIPProgram: string;
}

export class UserParameters implements IUserParameters {

    userCode = '';
    userName: string;
    receiveWithVariance = false;
    adjustTotalPrice = false;
    enableState = false;
    updateAPAutomatically = false;
    updatesWithWarning = false;
    updatesWithError = false;
    enableStockMovement = false;
    itemReceiptCode = 1;
    closePurchInstallments = false;
    updatesWithDuplicateError = false;
    defaultSpeciesExpenses = '';
    defaultSpeciesDuplic = '';
    defaultSpeciesDuplicNFF = '';
    updatesInventoryReconcilInvoices = false;
    sequenceIncrease = 10;
    updateNFeInvalidDANFE = false;
    updateNFeAutomatically = false;
    updateOFInvalidNFe = false;
    updateQuantitiesRMA = false;
    updateRMA = false;
    verifyDivergTradeNotesVsPayTerm = false;
    enableDocOfVendorWithRestriction = false;
    creditNoteGeneration = false;
    enableBusinessUnit = false;
    sameSupplierMatrixOrder = false;
    enableAutomaticDuplicate = false;
    reverseCommission = false;
    proRateFIFOQuantityDifference = false;
    updateRIAutomatically = false;
    validatesAccountingAccounts = false;
    updateOFAutomatically = false;
    originIPIRate = 1;
    enableICMSRate = false;
    enableIPIRate = false;
    enableICMSTaxationCode = false;
    enableIPITaxationCode = false;
    enableTaxClassification = false;
    enableItemExpenses = false;
    enableFiscalSpecies = false;
    enableSequence = false;
    enableTotalTaxes = false;
    itemDiscount = false;
    enablesAggregateItem = false;
    convertEntityQty = false;
    consistsUnitPrice = false;
    rateTotalDiscount = false;
    distribFunctFreight = 1;
    reopenPurchInstallments = false;
    reopenCustomerOrder = false;
    receiveOtherVendorOrder = false;
    receiveWithoutOrder = false;
    firstItemSequence = 10;
    roundUnitPrice = 1;
    userDocsPermission = 1;
    allowedVariation = 0.0; // decimal
    variationUpdated = 0;
    variationIssuing = 0;
    shipToDatePermissionVariation = 0;
    updateManifestAutomatically = false;
    enableAsynchronousValidationNFeCTe = false;
    enableIPIReductionPercentage = false;
    enableICMSReductionPercentage = false;
    enableToll = false;
    enableFIFOInPurchaseReq = false;
    considersValueInFIFO = false;
    enableDocumentExpenses = false;
    acceptableTaxDifference = 0.0; // decimal
    consigReceiptValuation = 0; // médio
    enableLeasingContract = false;
    enableTaxConfiguratorForWithheldTaxes = false;
    backGFEAccountingIntegration = false;
    automaticBalanceAllocation = false;
    execGZIPProgram = '';

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    static of(json: any = {}) {
        return new UserParameters(json);
    }

    static empty() {
        return new UserParameters();
    }

    static fromJson(json: Array<any> = []) {

        const items: Array<IUserParameters> = [];

        for (const values of json) {
            items.push(new UserParameters(values));
        }

        return items;
    }

}
