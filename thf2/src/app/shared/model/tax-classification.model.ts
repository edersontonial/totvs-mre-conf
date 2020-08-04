export interface ITaxClassification {
    classifCode: string;
    descriptionClassif: string;
}

export class TaxClassification implements ITaxClassification {

    classifCode: string;
    descriptionClassif: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    get $classifCode(): string {
        return this.classifCode;
    }

    get $descriptionClassif(): string {
        return this.descriptionClassif;
    }

    set $classifCode(classifCode: string) { this.classifCode = classifCode; }
    set $descriptionClassif(descriptionClassif: string) { this.descriptionClassif = descriptionClassif; }

    static of(json: any = {}) {
        return new TaxClassification(json);
    }

    static empty() {
        return new TaxClassification();
    }

    static fromJson(json: Array<any> = []) {

        const items: Array<ITaxClassification> = [];

        for (const values of json) {
            items.push(new TaxClassification(values));
        }

        return items;
    }

}
