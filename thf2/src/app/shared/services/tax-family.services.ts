import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PoDisclaimer } from '@po-ui/ng-components';

import { TotvsResponse } from 'dts-backoffice-util';
import { ITaxFamily } from '../model/tax-family.model';



@Injectable()
export class TaxFamilyService {

    // FIXME: Ajuste o módulo

    private apiUrl = '/dts/datasul-rest/resources/prg/cdp/v1/taxFamily';

    constructor(private http: HttpClient) { }

    query(filters: PoDisclaimer[], page = 1, pageSize = 20): Observable<TotvsResponse<ITaxFamily>> {

        let url = `${this.apiUrl}?pageSize=${pageSize}&page=${page}`;

        if (filters && filters.length > 0) {

            const urlParams = new Array<string>();

            filters.map(filter => {
                urlParams.push(`${filter.property}=${filter.value}`);
            });

            url = `${url}&${urlParams.join('&')}`;
        }

        return this.http.get<TotvsResponse<ITaxFamily>>(url);
    }

    getById(taxFamilyCode: string): Observable<ITaxFamily> {
        return this.http.get<ITaxFamily>(`${this.apiUrl}/${taxFamilyCode}`);
    }
    getFilteredData(filter: string, page: number, pageSize: number): Observable<ITaxFamily> {
        const header = { params: { page: page.toString(), pageSize: pageSize.toString() } };

        if (filter && filter.length > 0) {
            header.params['taxFamilyCode'] = filter;
        }

        return this.http.get<ITaxFamily>(`${this.apiUrl}`, header);
    }

    getObjectByValue(taxFamilyCode: string): Observable<ITaxFamily> {
        return this.http.get<ITaxFamily>(`${this.apiUrl}/${taxFamilyCode}`);
    }

}
