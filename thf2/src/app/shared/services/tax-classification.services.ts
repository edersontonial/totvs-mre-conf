import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PoDisclaimer, PoLookupFilteredItemsParams } from '@po-ui/ng-components';

import { TotvsResponse } from 'dts-backoffice-util';

import { ITaxClassification } from '../model/tax-classification.model';

@Injectable()
export class TaxClassificationService {

    // FIXME: Ajuste o módulo

    private apiUrl = '/dts/datasul-rest/resources/prg/cdp/v1/taxClassification';

    constructor(private http: HttpClient) { }

    query(filters: PoDisclaimer[], page = 1, pageSize = 20): Observable<TotvsResponse<ITaxClassification>> {

        let url = `${this.apiUrl}?pageSize=${pageSize}&page=${page}`;

        if (filters && filters.length > 0) {

            const urlParams = new Array<string>();

            filters.map(filter => {
                urlParams.push(`${filter.property}=${filter.value}`);
            });

            url = `${url}&${urlParams.join('&')}`;
        }

        return this.http.get<TotvsResponse<ITaxClassification>>(url);
    }

    getById(classifCode: string): Observable<ITaxClassification> {
        return this.http.get<ITaxClassification>(`${this.apiUrl}/${classifCode}`);
    }

    getFilteredItems(params: PoLookupFilteredItemsParams) {
        const header = { params: { page: params.page.toString(), pageSize: params.pageSize.toString() } };

        if (params.filter && params.filter.length > 0) {
            header.params['classifCode'] = params.filter;
        }

        return this.http.get<ITaxClassification>(`${this.apiUrl}`, header);
    }

    getObjectByValue(classifCode: string): Observable<ITaxClassification> {
        return this.http.get<ITaxClassification>(`${this.apiUrl}/${classifCode}`);
    }
}
