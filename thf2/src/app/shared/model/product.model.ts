export interface IProduct {
    product: string;
    productDescription: string;
    stockGroup: number;
    fiscalClassification: string;
    family: string;
    commercialFamily: string;
}

export class Product implements IProduct {
    product: string;
    productDescription: string;
    stockGroup: number;
    fiscalClassification: string;
    family: string;
    commercialFamily: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    static of(json: any = {}) {
        return new Product(json);
    }

    static empty() {
        return new Product();
    }

    static fromJson(json: Array<any> = []) {

        const items: Array<IProduct> = [];

        for (const values of json) {
            items.push(new Product(values));
        }

        return items;
    }

}
