export interface IIcmsTaxCodeDay {
    taxCode: string;
    descriptionTaxCode: string;
}

export class IcmsTaxCodeDay implements IIcmsTaxCodeDay {

    taxCode: string;
    descriptionTaxCode: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    get $taxCode(): string {
        return this.taxCode;
    }
    get $descriptionTaxCode(): string {
        return this.descriptionTaxCode;
    }

    set $taxCode(taxCode: string) { this.taxCode = taxCode; }
    set $descriptionTaxCode(descriptionTaxCode: string) { this.descriptionTaxCode = descriptionTaxCode; }

    static of(json: any = {}) {
        return new IcmsTaxCodeDay(json);
    }

    static empty() {
        return new IcmsTaxCodeDay();
    }

    static fromJson(json: Array<any> = []) {

        const items: Array<IIcmsTaxCodeDay> = [];

        for (const values of json) {
            items.push(new IcmsTaxCodeDay(values));
        }

        return items;
    }

}
