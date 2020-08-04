import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PoDisclaimer } from '@po-ui/ng-components';

import { TotvsResponse } from 'dts-backoffice-util';

import { ITaxServiceInss } from '../model/tax-service-inss.model';

@Injectable()
export class TaxServiceInssService {

    // FIXME: Ajuste o módulo

    private apiUrl = '/dts/datasul-rest/resources/prg/cdp/v1/inssService';

    constructor(private http: HttpClient) { }

    query(filters: PoDisclaimer[], page = 1, pageSize = 20): Observable<TotvsResponse<ITaxServiceInss>> {

        let url = `${this.apiUrl}?pageSize=${pageSize}&page=${page}`;

        if (filters && filters.length > 0) {

            const urlParams = new Array<string>();

            filters.map(filter => {
                urlParams.push(`${filter.property}=${filter.value}`);
            });

            url = `${url}&${urlParams.join('&')}`;
        }

        return this.http.get<TotvsResponse<ITaxServiceInss>>(url);
    }

    getById(inssServiceCode: number): Observable<ITaxServiceInss> {
        return this.http.get<ITaxServiceInss>(`${this.apiUrl}/${inssServiceCode}`);
    }

    getFilteredData(filter: string, page: number, pageSize: number): Observable<ITaxServiceInss> {
        const header = { params: { page: page.toString(), pageSize: pageSize.toString() } };

        if (filter && filter.length > 0) {
            header.params['inssServiceCode'] = filter;
        }

        return this.http.get<ITaxServiceInss>(`${this.apiUrl}`, header);
    }

    getObjectByValue(inssServiceCode: number): Observable<ITaxServiceInss> {
        return this.http.get<ITaxServiceInss>(`${this.apiUrl}/${inssServiceCode}`);
    }
}
