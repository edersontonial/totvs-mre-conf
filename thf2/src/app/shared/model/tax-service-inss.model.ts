export interface ITaxServiceInss {
    inssServiceCode: number;
    sefazCode: string;
    descriptionInssService: string;
}

export class TaxServiceInss implements ITaxServiceInss {

    inssServiceCode: number;
    sefazCode: string;
    descriptionInssService: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    get $inssServiceCode(): number {
        return this.inssServiceCode;
    }

    get $sefazCode(): string {
        return this.sefazCode;
    }
    get $descriptionInssService(): string {
        return this.descriptionInssService;
    }

    set $inssServiceCode(inssServiceCode: number) { this.inssServiceCode = inssServiceCode; }
    set $sefazCode(sefazCode: string) { this.sefazCode = sefazCode; }
    set $descriptionInssService(descriptionInssService: string) { this.descriptionInssService = descriptionInssService; }

    static of(json: any = {}) {
        return new TaxServiceInss(json);
    }

    static empty() {
        return new TaxServiceInss();
    }

    static fromJson(json: Array<any> = []) {

        const items: Array<ITaxServiceInss> = [];

        for (const values of json) {
            items.push(new TaxServiceInss(values));
        }

        return items;
    }

}
