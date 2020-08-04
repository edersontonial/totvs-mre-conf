import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PoDisclaimer } from '@po-ui/ng-components';

import { TotvsResponse } from 'dts-backoffice-util';

import { IEstablishmentsPublic } from '../model/establishments-public.model';

@Injectable()
export class EstablishmentsPublicService {

    // FIXME: Ajuste o módulo
    private apiUrl = '/dts/datasul-rest/resources/prg/cdp/v1/establishmentsPublic';

    constructor(private http: HttpClient) { }

    query(filters: PoDisclaimer[], page = 1, pageSize = 20): Observable<TotvsResponse<IEstablishmentsPublic>> {

        let url = `${this.apiUrl}?pageSize=${pageSize}&page=${page}`;

        if (filters && filters.length > 0) {

            const urlParams = new Array<string>();

            filters.map(filter => {
                urlParams.push(`${filter.property}=${filter.value}`);
            });

            url = `${url}&${urlParams.join('&')}`;
        }

        return this.http.get<TotvsResponse<IEstablishmentsPublic>>(url);
    }

    getById(id: string): Observable<IEstablishmentsPublic> {
        return this.http.get<IEstablishmentsPublic>(`${this.apiUrl}/${id}`);
    }

    getFilteredData(filter: string, page: number, pageSize: number): Observable<IEstablishmentsPublic> {
        const header = { params: { page: page.toString(), pageSize: pageSize.toString() } };

        if (filter && filter.length > 0) {
            header.params['code'] = filter;
        }

        return this.http.get<IEstablishmentsPublic>(`${this.apiUrl}`, header);
    }

    getObjectByValue(id: string): Observable<IEstablishmentsPublic> {
        return this.http.get<IEstablishmentsPublic>(`${this.apiUrl}/${id}`);
    }
}
