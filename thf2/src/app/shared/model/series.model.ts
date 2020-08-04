export interface ISeries {
    seriesCode: string;
    linkedSeries: string;
    emissionType: number;
    invoiceOrRemit: number;
    lastBillingNumber: number;
    seriesType: number;
    lastBillingDate: Date;
    nextBillingDate: Date;
}

export class Series implements ISeries {
    seriesCode: string;
    linkedSeries: string;
    emissionType: number;
    invoiceOrRemit: number;
    lastBillingNumber: number;
    seriesType: number;
    lastBillingDate: Date;
    nextBillingDate: Date;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    static of(json: any = {}) {
        return new Series(json);
    }

    static empty() {
        return new Series();
    }

    static fromJson(json: Array<any> = []) {

        const items: Array<ISeries> = [];

        for (const values of json) {
            items.push(new Series(values));
        }

        return items;
    }

}
