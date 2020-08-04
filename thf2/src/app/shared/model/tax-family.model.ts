export interface ITaxFamily {
    taxFamilyCode: string;
    taxFamilyDescription: string;
}

export class TaxFamily implements ITaxFamily {

    taxFamilyCode: string;
    taxFamilyDescription: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    get $taxFamilyCode(): string {
        return this.taxFamilyCode;
    }

    get $taxFamilyDescription(): string {
        return this.taxFamilyDescription;
    }

    set $taxFamilyCode(taxFamilyCode: string) { this.taxFamilyCode = taxFamilyCode; }
    set $taxFamilyDescription(taxFamilyDescription: string) { this.taxFamilyDescription = taxFamilyDescription; }

    static of(json: any = {}) {
        return new TaxFamily(json);
    }

    static empty() {
        return new TaxFamily();
    }

    static fromJson(json: Array<any> = []) {

        const items: Array<ITaxFamily> = [];

        for (const values of json) {
            items.push(new TaxFamily(values));
        }

        return items;
    }

}
