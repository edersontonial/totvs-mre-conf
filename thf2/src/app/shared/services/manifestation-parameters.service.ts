import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PoDisclaimer } from '@po-ui/ng-components';

import { TotvsResponse } from 'dts-backoffice-util';

import { IManifestationParameters } from '../model/manifestation-parameters.model';

@Injectable()
export class ManifestationParametersService {

    // FIXME: Ajuste o módulo
    private apiUrl = '/dts/datasul-rest/resources/prg/rep/v1/manifestationParameters';

    constructor(private http: HttpClient) { }

    query(filters: PoDisclaimer[], page = 1, pageSize = 20): Observable<TotvsResponse<IManifestationParameters>> {

        let url = `${this.apiUrl}?pageSize=${pageSize}&page=${page}`;

        if (filters && filters.length > 0) {

            const urlParams = new Array<string>();

            filters.map(filter => {
                urlParams.push(`${filter.property}=${filter.value}`);
            });

            url = `${url}&${urlParams.join('&')}`;
        }
        return this.http.get<TotvsResponse<IManifestationParameters>>(url);
    }

    getById(id: string): Observable<IManifestationParameters> {
        return this.http.get<IManifestationParameters>(`${this.apiUrl}/${id}`);
    }

    create(model: IManifestationParameters): Observable<IManifestationParameters> {
        return this.http.post<IManifestationParameters>(`${this.apiUrl}`, model);
    }

    update(model: IManifestationParameters): Observable<IManifestationParameters> {
        return this.http.put<IManifestationParameters>(`${this.apiUrl}/${model.siteId}`, model);
    }

    delete(id: string): Observable<object> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    getMetadados(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/metadados/${id}`);
    }

}
