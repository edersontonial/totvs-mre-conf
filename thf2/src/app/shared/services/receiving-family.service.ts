import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { PoDisclaimer } from '@po-ui/ng-components';

import { TotvsResponse } from 'dts-backoffice-util';

import { IReceivingFamily, ReceivingFamily } from '../model/receiving-family.model';

@Injectable()
export class ReceivingFamilyService {

    // FIXME: Ajuste o módulo
    // private apiUrl = '/receivingFamily';
    private apiUrl = '/dts/datasul-rest/resources/prg/rep/v1/receivingFamily';

    constructor(private http: HttpClient) { }

    query(filters: PoDisclaimer[], page = 1, pageSize = 20): Observable<TotvsResponse<IReceivingFamily>> {

        let url = `${this.apiUrl}?pageSize=${pageSize}&page=${page}`;
        if (filters && filters.length > 0) {

            const urlParams = new Array<string>();

            filters.map(filter => {

                urlParams.push(`${filter.property}=${filter.value}`);
            });

            url = `${url}&${urlParams.join('&')}`;
        }

        return this.http.get<TotvsResponse<IReceivingFamily>>(url);
    }

    getById(familyCode: string): Observable<IReceivingFamily> {
        // Base64 - por ser um campo caracter e permitir caracter especial exemplo "/""
        return this.http.get<IReceivingFamily>(`${this.apiUrl}/${btoa(familyCode)}`);
    }

    replicationData(model: IReceivingFamily): Observable<IReceivingFamily> {
        return this.http.get<IReceivingFamily>(`${this.apiUrl}/${ReceivingFamily.getInternalId(model)}`);
    }

    update(model: IReceivingFamily): Observable<IReceivingFamily> {
        return this.http.put<IReceivingFamily>(`${this.apiUrl}/${ReceivingFamily.getInternalId(model)}`, model);
    }

    getMetadados(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/metadadosReceivingFamily`);
    }

}
