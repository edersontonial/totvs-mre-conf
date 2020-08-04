export interface IReceivingFamily {

    familyCode: string;
    description: string;
    varQuantityLimit: number;
    varAmountLimit: number;
    greaterAmtVariance: number;
    variationQtyRe: number;
    taxClassification: string;
    ipiFamily: string;
    icmsTaxation: number;
    ipiTaxation: number;
    issTaxation: number;
    rfTaxation: number;

}



export class ReceivingFamily implements IReceivingFamily {

    familyCode: string;
    description: string;
    varQuantityLimit: number;
    varAmountLimit: number;
    greaterAmtVariance: number;
    variationQtyRe: number;
    taxClassification: string;
    ipiFamily: string;
    icmsTaxation: number;
    ipiTaxation: number;
    issTaxation: number;
    rfTaxation: number;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    get $familyCode(): string {
        return this.familyCode;
    }

    get $description(): string {
        return this.description;
    }

    get $varQuantityLimit(): number {
        return this.varQuantityLimit;
    }

    get $varAmountLimit(): number {
        return this.varAmountLimit;
    }
    get $greaterAmtVariance(): number {
        return this.greaterAmtVariance;
    }
    get $variationQtyRe(): number {
        return this.variationQtyRe;
    }

    get $taxClassification(): string {
        return this.taxClassification;
    }

    get $ipiFamily(): string {
        return this.ipiFamily;
    }

    get $icmsTaxation(): number {
        return this.icmsTaxation;
    }

    get $ipiTaxation(): number {
        return this.ipiTaxation;
    }

    get $issTaxation(): number {
        return this.issTaxation;
    }

    get $rfTaxation(): number {
        return this.rfTaxation;
    }

    set $familyCode(familyCode: string) { this.familyCode = familyCode; }
    set $description(description: string) { this.description = description; }
    set $varQuantityLimit(varQuantityLimit: number) { this.varQuantityLimit = varQuantityLimit; }
    set $varAmountLimit(varAmountLimit: number) { this.varAmountLimit = varAmountLimit; }
    set $greaterAmtVariance(greaterAmtVariance: number) { this.greaterAmtVariance = greaterAmtVariance; }
    set $variationQtyRe(variationQtyRe: number) { this.variationQtyRe = variationQtyRe; }
    set $taxClassification(taxClassification: string) { this.taxClassification = taxClassification; }
    set $ipiFamily(ipiFamily: string) { this.ipiFamily = ipiFamily; }
    set $icmsTaxation(icmsTaxation: number) { this.icmsTaxation = icmsTaxation; }
    set $ipiTaxation(ipiTaxation: number) { this.ipiTaxation = ipiTaxation; }
    set $issTaxation(issTaxation: number) { this.issTaxation = issTaxation; }
    set $rfTaxation(rfTaxation: number) { this.rfTaxation = rfTaxation; }

    static of(json: any = {}) {
        return new ReceivingFamily(json);
    }

    static empty() {
        return new ReceivingFamily();
    }

    static fromJson(json: Array<any> = []) {

        const items: Array<IReceivingFamily> = [];

        for (const values of json) {
            items.push(new ReceivingFamily(values));
        }

        return items;
    }

    static getInternalId(param: IReceivingFamily): string {
        if (param.familyCode === '') {
            param.familyCode = '\'\'';
        }
        return `${btoa(param.familyCode)}`;
    }

}
