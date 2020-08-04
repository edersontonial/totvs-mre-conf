export interface IEstablishmentsPublic {
    code: string;
    name: string;
}

export class EstablishmentsPublic implements IEstablishmentsPublic {
    code: string;
    name: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    get $code() { return this.code; }
    get $name() { return this.name; }

    static of(json: any = {}) {
        return new EstablishmentsPublic(json);
    }

    static empty() {
        return new EstablishmentsPublic();
    }

    static fromJson(json: Array<any> = []) {

        const items: Array<IEstablishmentsPublic> = [];

        for (const values of json) {
            items.push(new EstablishmentsPublic (values));
        }

        return items;
    }

}
