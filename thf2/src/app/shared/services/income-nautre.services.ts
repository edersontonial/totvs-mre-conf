import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PoDisclaimer } from '@po-ui/ng-components';

import { TotvsResponse } from 'dts-backoffice-util';

import { IIncomeNature } from '../model/income-nature.model';

@Injectable()
export class IncomeNatureService {

    // FIXME: Ajuste o módulo

    private apiUrl = '/dts/datasul-rest/resources/prg/cdp/v1/incomeNature';

    constructor(private http: HttpClient) { }

    query(filters: PoDisclaimer[], page = 1, pageSize = 20): Observable<TotvsResponse<IIncomeNature>> {

        let url = `${this.apiUrl}?pageSize=${pageSize}&page=${page}`;

        if (filters && filters.length > 0) {

            const urlParams = new Array<string>();

            filters.map(filter => {
                urlParams.push(`${filter.property}=${filter.value}`);
            });

            url = `${url}&${urlParams.join('&')}`;
        }

        return this.http.get<TotvsResponse<IIncomeNature>>(url);
    }

    getById(incomeNaturCode: string): Observable<IIncomeNature> {
        return this.http.get<IIncomeNature>(`${this.apiUrl}/${incomeNaturCode}`);
    }

    getFilteredData(filter: string, page: number, pageSize: number): Observable<IIncomeNature> {
        const header = { params: { page: page.toString(), pageSize: pageSize.toString() } };

        if (filter && filter.length > 0) {
            header.params['incomeNaturCode'] = filter;
        }

        return this.http.get<IIncomeNature>(`${this.apiUrl}`, header);
    }

    getObjectByValue(incomeNaturCode: string): Observable<IIncomeNature> {
        return this.http.get<IIncomeNature>(`${this.apiUrl}/${incomeNaturCode}`);
    }
}
