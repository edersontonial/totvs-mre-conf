export interface IManifestationParameters {
    siteId: string;
    siteName: string;
    environment: number;
    processVersion: string;
    usesNationalEnvironment: boolean;
    lastNsu: number;
    userLastChange: string;
    manualManifestation: boolean;
    manifestationByReceipt: boolean;
    automaticManifestation: number;
    xmlDirectory: string;

}
export interface IEnvironmentType {
    label: string;
    color: string;
    value: number;
}
export enum Environment {
    homologation = 1,
    production = 2
}

export enum AutomaticManifestation {
    operationConfirmed = 1,
    emissionScience = 2

}

export class ManifestationParameters implements IManifestationParameters {

    siteId: string;
    siteName: string;
    environment: number;
    processVersion: string;
    usesNationalEnvironment: boolean;
    lastNsu: number;
    userLastChange: string;
    manualManifestation: boolean;
    manifestationByReceipt: boolean;
    automaticManifestation: number;
    xmlDirectory: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }

    get $siteId() { return this.siteId; }
    get $siteName() { return this.siteName; }
    get $environment() { return this.environment; }
    get $processVersion() { return this.processVersion; }
    get $usesNationalEnvironment() { return this.usesNationalEnvironment; }
    get $lastNsu() { return this.lastNsu; }
    get $userLastChange() { return this.userLastChange; }
    get $manualManifestation() { return this.manualManifestation; }
    get $manifestationByReceipt() { return this.manifestationByReceipt; }
    get $automaticManifestation() { return this.automaticManifestation; }
    get $xmlDirectory() { return this.xmlDirectory; }

    static of(json: any = {}) {
        return new ManifestationParameters(json);
    }

    static empty() {
        return new ManifestationParameters();
    }

    static fromJson(json: Array<any> = []) {

        const items: Array<IManifestationParameters> = [];

        for (const values of json) {
            items.push(new ManifestationParameters(values));
        }

        return items;
    }

    static environmentType(literals: {}): Array<any> {
        return [
            { value: 1, color: 'color-01', label: literals['production'] },
            { value: 2, color: 'color-08', label: literals['homologation'] }
        ];
    }

}
