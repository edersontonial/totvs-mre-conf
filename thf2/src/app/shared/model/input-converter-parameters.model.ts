export interface IInputConverterParameters {
    converterParameterSeq: number;
    suggestTaxClassificationItem: boolean;
    suggestItemDepositLocation: boolean;
    changeAutomaticTransactionDateOnGeneration: boolean;
    listSupplierItem: boolean;
    translatesXMLObservation: boolean;
    blockWhiteItem: boolean;
    enableItem: boolean;
    generateWithholdingTaxAutomatically: boolean;
    duplicateGenerationAccordingTo: number;
    validatesPhysicalAccessKey: boolean;
    blockCanceledInvoiceGeneration: boolean;
    receiveAtTAGxPedNFe: number;
    directoryForReadingXMLs: string;
    validatesTaxAccessKey: boolean;
    enableCTe: boolean;
    enableNFSe: boolean;
    generationOfTaxesAccordingTo: number;
    generateDuplicateAutomatically: boolean;
    PISTax: string;
    COFINSTax: string;
    IRRFTax: string;
    CSLLTax: string;
    INSSTax: string;
    ISSTax: string;
    PISKindDocument: string;
    COFINSKindDocument: string;
    IRRFKindDocument: string;
    CSLLKindDocument: string;
    INSSKindDocument: string;
    ISSKindDocument: string;
    PISWithholdingTax: string;
    COFINSWithholdingTax: string;
    IRRFWithholdingTax: string;
    CSLLWithholdingTax: string;
    INSSWithholdingTax: string;
    ISSWithholdingTax: string;
    fifoInXMLImport: boolean;

}

export class InputConverterParameters implements IInputConverterParameters {
    converterParameterSeq: number;
    suggestTaxClassificationItem: boolean;
    suggestItemDepositLocation: boolean;
    changeAutomaticTransactionDateOnGeneration: boolean;
    listSupplierItem: boolean;
    translatesXMLObservation: boolean;
    blockWhiteItem: boolean;
    enableItem: boolean;
    generateWithholdingTaxAutomatically: boolean;
    duplicateGenerationAccordingTo: number;
    validatesPhysicalAccessKey: boolean;
    blockCanceledInvoiceGeneration: boolean;
    receiveAtTAGxPedNFe: number;
    directoryForReadingXMLs: string;
    validatesTaxAccessKey: boolean;
    enableCTe: boolean;
    enableNFSe: boolean;
    generationOfTaxesAccordingTo: number;
    generateDuplicateAutomatically: boolean;
    PISTax: string;
    COFINSTax: string;
    IRRFTax: string;
    CSLLTax: string;
    INSSTax: string;
    ISSTax: string;
    PISKindDocument: string;
    COFINSKindDocument: string;
    IRRFKindDocument: string;
    CSLLKindDocument: string;
    INSSKindDocument: string;
    ISSKindDocument: string;
    PISWithholdingTax: string;
    COFINSWithholdingTax: string;
    IRRFWithholdingTax: string;
    CSLLWithholdingTax: string;
    INSSWithholdingTax: string;
    ISSWithholdingTax: string;
    fifoInXMLImport: boolean;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    static of(json: any = {}) {
        return new InputConverterParameters(json);
    }

    static empty() {
        return new InputConverterParameters();
    }

    static fromJson(json: Array<any> = []) {

        const items: Array<IInputConverterParameters> = [];

        for (const values of json) {
            items.push(new InputConverterParameters(values));
        }

        return items;
    }

}
