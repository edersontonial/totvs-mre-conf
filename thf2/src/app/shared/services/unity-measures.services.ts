import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PoDisclaimer } from '@po-ui/ng-components';

import { TotvsResponse } from 'dts-backoffice-util';
import { IUnityMeasures } from '../model/unity-measures.model';


@Injectable()
export class UnityMeasuresService {

    // FIXME: Ajuste o módulo

    private apiUrl = '/dts/datasul-rest/resources/prg/cdp/v1/unityMeasuresPublic';

    constructor(private http: HttpClient) { }

    query(filters: PoDisclaimer[], page = 1, pageSize = 20): Observable<TotvsResponse<IUnityMeasures>> {

        let url = `${this.apiUrl}?pageSize=${pageSize}&page=${page}`;

        if (filters && filters.length > 0) {

            const urlParams = new Array<string>();

            filters.map(filter => {
                urlParams.push(`${filter.property}=${filter.value}`);
            });

            url = `${url}&${urlParams.join('&')}`;
        }

        return this.http.get<TotvsResponse<IUnityMeasures>>(url);
    }

    getById(code: string): Observable<IUnityMeasures> {
        return this.http.get<IUnityMeasures>(`${this.apiUrl}/${code}`);
    }

    getFilteredData(filter: string, page: number, pageSize: number): Observable<IUnityMeasures> {
        const header = { params: { page: page.toString(), pageSize: pageSize.toString() } };

        if (filter && filter.length > 0) {
            header.params['code'] = filter;
        }

        return this.http.get<IUnityMeasures>(`${this.apiUrl}`, header);
    }

    getObjectByValue(code: string): Observable<IUnityMeasures> {
        return this.http.get<IUnityMeasures>(`${this.apiUrl}/${code}`);
    }
}
