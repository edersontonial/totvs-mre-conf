export interface ITaxType {
    taxCode: number;
    taxDescription: string;
    type: number;
    typeDescription: string;

}

export class TaxType implements ITaxType {

    taxCode: number;
    taxDescription: string;
    type: number;
    typeDescription: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    get $taxCode(): number { return this.taxCode; }
    get $taxDescription(): string { return this.taxDescription; }
    get $type(): number { return this.type; }
    get $typeDescription(): string { return this.typeDescription; }

    set $taxCode(taxCode: number) { this.taxCode = taxCode; }
    set $taxDescription(taxDescription: string) { this.taxDescription = taxDescription; }
    set $type(type: number) { this.type = type; }
    set $typeDescription(typeDescription: string) { this.typeDescription = typeDescription; }

    static of(json: any = {}) {
        return new TaxType(json);
    }

    static empty() {
        return new TaxType();
    }

    static fromJson(json: Array<any> = []) {

        const items: Array<ITaxType> = [];

        for (const values of json) {
            items.push(new TaxType(values));
        }

        return items;
    }

}
