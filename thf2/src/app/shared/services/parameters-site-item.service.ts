import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PoDisclaimer } from '@po-ui/ng-components';

import { TotvsResponse } from 'dts-backoffice-util';

import { IParametersSiteItem, ParametersSiteItem } from '../model/parameters-site-item.model';

@Injectable()
export class ParametersSiteItemService {

    private headers = { headers: { 'X-PO-Screen-Lock': 'true' } };
    private apiUrl = '/dts/datasul-rest/resources/prg/cdp/v1/parametersSiteitem';
    private expandables = [''];

    constructor(private http: HttpClient) { }

    query(filters: PoDisclaimer[], page = 1, pageSize = 20): Observable<TotvsResponse<IParametersSiteItem>> {
        let url = `${this.apiUrl}?pageSize=${pageSize}&page=${page}`;
        if (filters && filters.length > 0) {

            const urlParams = new Array<string>();

            filters.map(filter => {
                urlParams.push(`${filter.property}=${btoa(filter.value)}`);
            });

            url = `${url}&${urlParams.join('&')}`;
        }

        return this.http.get<TotvsResponse<IParametersSiteItem>>(url);
    }

    getByItem(item: string, expandables: string[]): Observable<TotvsResponse<IParametersSiteItem>> {
        let lstExpandables = this.getExpandables(expandables);
        if (item === '') {
            item = '\'\'';
        }
        const url = `${this.apiUrl}${lstExpandables}?item=${btoa(item)}`;
        if (lstExpandables !== '') { lstExpandables = `?${lstExpandables}`; }

        return this.http.get<TotvsResponse<IParametersSiteItem>>(url, this.headers);
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


    getById(id: string): Observable<IParametersSiteItem> {
        return this.http.get<IParametersSiteItem>(`${this.apiUrl}/${btoa(id)}`);
    }

    update(model: IParametersSiteItem): Observable<IParametersSiteItem> {
        return this.http.put<IParametersSiteItem>(`${this.apiUrl}/${ParametersSiteItem.getInternalId(model)}`, model);
    }

}
