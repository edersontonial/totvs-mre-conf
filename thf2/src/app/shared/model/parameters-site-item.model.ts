export interface IParametersSiteItem {
    item: string;
    site: string;
    siteName: string;
    itemDescription: string;
    variationQuantityReceipt: number;
    variationGreaterAmountReceipt: number;
    limitVariationQuantity: number;
    limitVariationValue: number;
}

export class ParametersSiteItem implements IParametersSiteItem {

    item = '';
    site = '';
    siteName = '';
    itemDescription = '';
    variationQuantityReceipt: number;
    variationGreaterAmountReceipt: number;
    limitVariationQuantity: number;
    limitVariationValue: number;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    get $site(): string {
        return this.site;
    }

    get $siteName(): string {
        return this.siteName;
    }

    get $item(): string {
        return this.item;
    }

    get $itemDescription(): string {
        return this.itemDescription;
    }

    get $variationQuantityReceipt(): number {
        return this.variationQuantityReceipt;
    }
    get $variationGreaterAmountReceipt(): number {
        return this.variationGreaterAmountReceipt;
    }
    get $limitVariationQuantity(): number {
        return this.limitVariationQuantity;
    }
    get $limitVariationValue(): number {
        return this.limitVariationValue;
    }

    set $site(site: string) { this.site = site; }
    set $siteName(siteName: string) { this.siteName = siteName; }
    set $item(familyCode: string) { this.item = familyCode; }
    set $itemDescription(familyName: string) { this.itemDescription = familyName; }
    set $variationQuantityReceipt(variationQuantityReceipt: number) { this.variationQuantityReceipt = variationQuantityReceipt; }
    set $varAmountLimit(variationGreaterAmountReceipt: number) { this.variationGreaterAmountReceipt = variationGreaterAmountReceipt; }
    set $greaterAmtVariance(limitVariationQuantity: number) { this.limitVariationQuantity = limitVariationQuantity; }
    set $variationQtyRe(limitVariationValue: number) { this.limitVariationValue = limitVariationValue; }


    static of(json: any = {}) {
        return new ParametersSiteItem(json);
    }

    static empty() {
        return new ParametersSiteItem();
    }

    static fromJson(json: Array<any> = []) {

        const items: Array<IParametersSiteItem> = [];

        for (const values of json) {
            items.push(new ParametersSiteItem(values));
        }
        return items;
    }

    static getInternalId(param: IParametersSiteItem): string {
        return `${btoa(param.item)};${btoa(param.site)}`;
    }

}
