export interface IUnityMeasures {
    code: string;
    description: string;
}

export class UnityMeasures implements IUnityMeasures {

    code: string;
    description: string;


    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    get $code(): string {
        return this.code;
    }

    get $description(): string {
        return this.description;
    }

    set $code(code: string) { this.code = code; }
    set $description(description: string) { this.description = description; }

    static of(json: any = {}) {
        return new UnityMeasures(json);
    }

    static empty() {
        return new UnityMeasures();
    }

    static fromJson(json: Array<any> = []) {

        const items: Array<IUnityMeasures> = [];

        for (const values of json) {
            items.push(new UnityMeasures(values));
        }

        return items;
    }

}
