import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PoDisclaimer } from '@po-ui/ng-components';

import { TotvsResponse } from 'dts-backoffice-util';

import { IParametersSiteFamily, ParametersSiteFamily } from '../model/parameters-site-family.model';

@Injectable()
export class ParametersSiteFamilyService {

    private headers = { headers: { 'X-PO-Screen-Lock': 'true' } };
    private apiUrl = '/dts/datasul-rest/resources/prg/cdp/v1/parametersSiteFamily';
    private expandables = [''];

    constructor(private http: HttpClient) { }

    query(filters: PoDisclaimer[], page = 1, pageSize = 20): Observable<TotvsResponse<IParametersSiteFamily>> {
        let url = `${this.apiUrl}?pageSize=${pageSize}&page=${page}`;
        if (filters && filters.length > 0) {

            const urlParams = new Array<string>();

            filters.map(filter => {
                urlParams.push(`${filter.property}=${filter.value}`);
            });

            url = `${url}&${urlParams.join('&')}`;
        }

        return this.http.get<TotvsResponse<IParametersSiteFamily>>(url);
    }

    getByFamily(familyCode: string, expandables: string[]): Observable<TotvsResponse<IParametersSiteFamily>> {
        let lstExpandables = this.getExpandables(expandables);
        const url = `${this.apiUrl}${lstExpandables}?familyCode=${familyCode}`;
        if (lstExpandables !== '') { lstExpandables = `?${lstExpandables}`; }

        return this.http.get<TotvsResponse<IParametersSiteFamily>>(url, this.headers);
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


    getById(id: string): Observable<IParametersSiteFamily> {
        return this.http.get<IParametersSiteFamily>(`${this.apiUrl}/${id}`);
    }

    create(model: IParametersSiteFamily): Observable<IParametersSiteFamily> {
        return this.http.post<IParametersSiteFamily>(`${this.apiUrl}`, model);
    }

    update(model: IParametersSiteFamily): Observable<IParametersSiteFamily> {
        return this.http.put<IParametersSiteFamily>(`${this.apiUrl}/${ParametersSiteFamily.getInternalId(model)}`, model);
    }

    delete(id: string): Observable<object> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

}
