
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PoDisclaimer } from '@po-ui/ng-components';
import { TotvsResponse } from '../interfaces/totvs-response.interface';
import { ISeries } from '../model/series.model';

@Injectable()
export class GenericService {

    private headers = { headers: { 'X-PO-Screen-Lock': 'true' } };
    private expandables = [''];

    constructor(public http: HttpClient) { }

    query(apiUrl: string, filters: PoDisclaimer[], page = 1, pageSize = 10): Observable<TotvsResponse<any>> {
        let url = `${apiUrl}?pageSize=${pageSize}&page=${page}`;

        if (filters && filters.length > 0) {

            const urlParams = new Array<string>();

            filters.map(filter => {
                urlParams.push(`${filter.property}=${filter.value}`);
            });

            url = `${url}&${urlParams.join('&')}`;
        }
        return this.http.get<TotvsResponse<any>>(url);
    }


    update(apiUrl: string,  model: any): Observable<any> {
        return this.http.put<any>(`${apiUrl}`, model);
    }

    getByKey(apiUrl: string, key: any, expandables: string[]): Observable<TotvsResponse<any>> {
        let lstExpandables = this.getExpandables(expandables);
        const url = `${apiUrl}${lstExpandables}?${key}`;
        if (lstExpandables !== '') { lstExpandables = `?${lstExpandables}`; }

        return this.http.get<TotvsResponse<any>>(url, this.headers);
    }
    getExpandables(expandables: string[]): string {
        let lstExpandables = '';

        if (expandables && expandables.length > 0) {
            expandables.map(expandable => {
                if (expandable !== '' && this.expandables.includes(expandable)) {
                    if (lstExpandables !== '') { lstExpandables = `${lstExpandables},`; }
                    lstExpandables = `${lstExpandables}${expandable}`;
                }
            });
        }

        if (lstExpandables !== '') { lstExpandables = `expand=${lstExpandables}`; }

        return lstExpandables;
    }



}
