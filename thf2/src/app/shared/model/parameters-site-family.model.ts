export interface IParametersSiteFamily {
    site: string;
    siteName: string;
    familyCode: string;
    familyName: string;
    varQuantityLimit: number;
    varAmountLimit: number;
    greaterAmtVariance: number;
    variationQtyRe: number;
}


export class ParametersSiteFamily implements IParametersSiteFamily {

    site = '';
    siteName = '';
    familyCode = '';
    familyName = '';
    varQuantityLimit: number;
    varAmountLimit: number;
    greaterAmtVariance: number;
    variationQtyRe: number;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    get $site(): string {
        return this.site;
    }

    get $siteName(): string {
        return this.siteName;
    }

    get $familyCode(): string {
        return this.familyCode;
    }

    get $familyName(): string {
        return this.familyName;
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

    set $site(site: string) { this.site = site; }
    set $siteName(siteName: string) { this.siteName = siteName; }
    set $familyCode(familyCode: string) { this.familyCode = familyCode; }
    set $familyName(familyName: string) { this.familyName = familyName; }
    set $varQuantityLimit(varQuantityLimit: number) { this.varQuantityLimit = varQuantityLimit; }
    set $varAmountLimit(varAmountLimit: number) { this.varAmountLimit = varAmountLimit; }
    set $greaterAmtVariance(greaterAmtVariance: number) { this.greaterAmtVariance = greaterAmtVariance; }
    set $variationQtyRe(variationQtyRe: number) { this.variationQtyRe = variationQtyRe; }


    static of(json: any = {}) {
        return new ParametersSiteFamily(json);
    }

    static empty() {
        return new ParametersSiteFamily();
    }

    static fromJson(json: Array<any> = []) {

        const items: Array<IParametersSiteFamily> = [];

        for (const values of json) {
            items.push(new ParametersSiteFamily(values));
        }
        return items;
    }

    static getInternalId(param: IParametersSiteFamily): string {
        return `${param.familyCode};${param.site}`;
    }

}
