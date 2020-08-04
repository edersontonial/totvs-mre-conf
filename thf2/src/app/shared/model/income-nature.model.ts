export interface IIncomeNature {
    incomeNature: string;
    descriptionNature: string;
    cofins: boolean;
    csll: boolean;
    inative: boolean;
    ir: boolean;
    physicalPerson: boolean;
    physicalPersonExt: boolean;
    pisPasep: boolean;
    corpEntity: boolean;
    corpEntityExt: boolean;

}

export class IncomeNature implements IIncomeNature {

    incomeNature: string;
    descriptionNature: string;
    cofins: boolean;
    csll: boolean;
    inative: boolean;
    ir: boolean;
    physicalPerson: boolean;
    physicalPersonExt: boolean;
    pisPasep: boolean;
    corpEntity: boolean;
    corpEntityExt: boolean;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    get $incomeNature(): string {
        return this.incomeNature;
    }

    get $descriptionNature(): string {
        return this.descriptionNature;
    }

    set $incomeNature(incomeNature: string) { this.incomeNature = incomeNature; }
    set $descriptionNature(descriptionNature: string) { this.descriptionNature = descriptionNature; }

    static of(json: any = {}) {
        return new IncomeNature(json);
    }

    static empty() {
        return new IncomeNature();
    }

    static fromJson(json: Array<any> = []) {

        const items: Array<IIncomeNature> = [];

        for (const values of json) {
            items.push(new IncomeNature(values));
        }

        return items;
    }

}
