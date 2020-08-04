import { PoLookupColumn } from '@po-ui/ng-components';

export class SeriesZoom {

    public static getZoomColumnsMI(literals: any): Array<PoLookupColumn> {
        return [
            { property: 'seriesCode', label: literals.seriesCode, type: 'string', width: '20%' },
            { property: 'linkedSeries', label: literals.linkedSeries, type: 'string', width: '25%' },
            { property: 'lastBillingDate', label: literals.lastBillingDate, type: 'date', width: '25%' },
            { property: 'nextBillingDate', label: literals.nextBillingDate, type: 'date', width: '30%' },
        ];
    }

    public static getZoomColumnsDefault(literals: any): Array<PoLookupColumn> {
        return [
            { property: 'seriesCode', label: literals.seriesCode, type: 'string', width: '20%' },
            { property: 'linkedSeries', label: literals.linkedSeries, type: 'string', width: '30%' },
            { property: 'emissionType', label: literals.emissionType, type: 'number', width: '50%' }
        ];
    }
}
