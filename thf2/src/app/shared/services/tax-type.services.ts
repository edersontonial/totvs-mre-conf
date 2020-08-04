import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PoDisclaimer } from '@po-ui/ng-components';

import { TotvsResponse } from 'dts-backoffice-util';
import { ITaxType } from '../model/tax-type.model';




@Injectable()
export class TaxTypeService {

    // FIXME: Ajuste o módulo

    private apiUrl = '/dts/datasul-rest/resources/prg/cdp/v1/taxType';

    constructor(private http: HttpClient) { }

    query(filters: PoDisclaimer[], page = 1, pageSize = 20): Observable<TotvsResponse<ITaxType>> {

        let url = `${this.apiUrl}?pageSize=${pageSize}&page=${page}`;

        if (filters && filters.length > 0) {

            const urlParams = new Array<string>();

            filters.map(filter => {
                urlParams.push(`${filter.property}=${filter.value}`);
            });

            url = `${url}&${urlParams.join('&')}`;
        }

        return this.http.get<TotvsResponse<ITaxType>>(url);
    }

    getById(taxCode: number): Observable<ITaxType> {
        return this.http.get<ITaxType>(`${this.apiUrl}/${taxCode}`);
    }
    getFilteredData(filter: string, page: number, pageSize: number): Observable<ITaxType> {
        const header = { params: { page: page.toString(), pageSize: pageSize.toString() } };

        if (filter && filter.length > 0) {
            header.params['taxCode'] = filter;
        }

        return this.http.get<ITaxType>(`${this.apiUrl}`, header);
    }

    getObjectByValue(taxCode: number): Observable<ITaxType> {
        return this.http.get<ITaxType>(`${this.apiUrl}/${taxCode}`);
    }
}
