import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PoDisclaimer } from '@po-ui/ng-components';

import { TotvsResponse } from 'dts-backoffice-util';
import { IIcmsTaxCodeDay } from '../model/icms-tax-code-day.model';


@Injectable()
export class IcmsTaxCodeDayService {

    // FIXME: Ajuste o módulo

    private apiUrl = '/dts/datasul-rest/resources/prg/ofp/v1/icmsTaxCodeDay';

    constructor(private http: HttpClient) { }

    query(filters: PoDisclaimer[], page = 1, pageSize = 20): Observable<TotvsResponse<IIcmsTaxCodeDay>> {

        let url = `${this.apiUrl}?pageSize=${pageSize}&page=${page}`;

        if (filters && filters.length > 0) {

            const urlParams = new Array<string>();

            filters.map(filter => {
                urlParams.push(`${filter.property}=${filter.value}`);
            });

            url = `${url}&${urlParams.join('&')}`;
        }

        return this.http.get<TotvsResponse<IIcmsTaxCodeDay>>(url);
    }

    getById(taxCode: string): Observable<IIcmsTaxCodeDay> {
        return this.http.get<IIcmsTaxCodeDay>(`${this.apiUrl}/${taxCode}`);
    }

    getFilteredData(filter: string, page: number, pageSize: number): Observable<IIcmsTaxCodeDay> {
        const header = { params: { page: page.toString(), pageSize: pageSize.toString() } };

        if (filter && filter.length > 0) {
            header.params['taxCode'] = filter;
        }

        return this.http.get<IIcmsTaxCodeDay>(`${this.apiUrl}`, header);
    }

    getObjectByValue(taxCode: string): Observable<IIcmsTaxCodeDay> {
        return this.http.get<IIcmsTaxCodeDay>(`${this.apiUrl}/${taxCode}`);
    }
}
