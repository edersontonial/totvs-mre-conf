export interface IReceivingItem {
    itemCode: string;
    descriptionItem: string;

    /*pagina 1 - Dados Gerais*/
    varQuantityLimit: number;
    varAmountLimit: number;
    variationQtyRe: number;
    greaterAmtVariance: number;
    taxCode: number;
    taxServiceCode: number;
    ipiFamily: string;
    taxClassification: string;
    taxServiceInss: string;
    icmsTaxation: number;
    ipiTaxation: number;
    issTaxation: number;
    incomeNature: string;
    taxIpiSuspens: boolean;
    onlyOtherTaxes: boolean;
    taxReadjFactor: number;
    issRate: number;
    ipiRate: number;
    rfTax: number;

    /*Página 3  - PIS/COfins*/
    pisOriginTrib: number;
    pisRate: number;
    pisCalculateUnitTax: boolean;
    pisValueUnit: number;
    pisReduct: number;
    substitutePisUnitBase: number;

    cofinsOriginTrib: number;
    cofinsRate: number;
    cofinsCalculateUnitTax: boolean;
    cofinsValueUnit: number;
    cofinsReduct: number;
    substituteCofinsUnitBase: number;

    /*Página 5 - SEFAZ AM*/
    productGeneralCodeIndex: number;
    codeTaxICMS: string;

    /*Página 6 - Internacional*/
    itemType: number;
    ivaIndex: boolean;
    codeTaxIva: number;
    redefinesConciliation: boolean;
    recyclableItem: boolean;
    codeRecyclableItem: number;
    unitMeasurementRecyclableItem: string;

}

export enum Origin {
    item = 1,
    nature = 2
}

export class ReceivingItem implements IReceivingItem {

    itemCode: string;
    descriptionItem: string;
    /*pagina 1 - Dados Gerais*/
    varQuantityLimit: number;
    varAmountLimit: number;
    variationQtyRe: number;
    greaterAmtVariance: number;
    taxCode: number;
    taxServiceCode: number;
    ipiFamily: string;
    taxClassification: string;
    taxServiceInss: string;
    icmsTaxation: number;
    ipiTaxation: number;
    issTaxation: number;
    incomeNature: string;
    taxIpiSuspens: boolean;
    onlyOtherTaxes: boolean;
    taxReadjFactor: number;
    issRate: number;
    ipiRate: number;
    rfTax: number;

    /*Página 3  - PIS/COfins*/
    pisOriginTrib = 1;
    pisRate: number;
    pisCalculateUnitTax: boolean;
    pisValueUnit: number;
    pisReduct: number;
    substitutePisUnitBase: number;

    cofinsOriginTrib = 1;
    cofinsRate: number;
    cofinsCalculateUnitTax: boolean;
    cofinsValueUnit: number;
    cofinsReduct: number;
    substituteCofinsUnitBase: number;

    /*Página 5 - SEFAZ AM*/
    productGeneralCodeIndex: number;
    codeTaxICMS: string;

    /*Página 6 - Internacional*/
    itemType: number;
    ivaIndex: boolean;
    codeTaxIva: number;
    redefinesConciliation: boolean;
    recyclableItem: boolean;
    codeRecyclableItem: number;
    unitMeasurementRecyclableItem: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    get $itemCode() {
        return this.itemCode;
    }

    get $descriptionItem() {
        return this.descriptionItem;
    }

    set $id(itemCode: string) {
        this.itemCode = itemCode;
    }

    set $name(descriptionItem: string) {
        this.descriptionItem = descriptionItem;
    }

    static of(json: any = {}) {
        return new ReceivingItem(json);
    }

    static empty() {
        return new ReceivingItem();
    }

    static fromJson(json: Array<any> = []) {

        const items: Array<IReceivingItem> = [];

        for (const values of json) {
            items.push(new ReceivingItem(values));
        }

        return items;
    }

     static getInternalId(param: IReceivingItem): string {
        if (param.itemCode === '') {
            param.itemCode = '\'\'';
        }
        return `${btoa(param.itemCode)}`;
    }
}
