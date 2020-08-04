import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PoDisclaimer } from '@po-ui/ng-components';

import { TotvsResponse } from 'dts-backoffice-util';

import { IReceivingItem, ReceivingItem } from '../model/receiving-item.model';

@Injectable()
export class ReceivingItemService {

    // FIXME: Ajuste o módulo
    private apiUrl = '/dts/datasul-rest/resources/prg/rep/v1/receivingItem';

    constructor(private http: HttpClient) { }

    query(filters: PoDisclaimer[], page = 1, pageSize = 20): Observable<TotvsResponse<IReceivingItem>> {

        let url = `${this.apiUrl}?pageSize=${pageSize}&page=${page}`;
        if (filters && filters.length > 0) {

            const urlParams = new Array<string>();

            filters.map(filter => {
                urlParams.push(`${filter.property}=${btoa(filter.value)}`);
            });

            url = `${url}&${urlParams.join('&')}`;
        }

        return this.http.get<TotvsResponse<IReceivingItem>>(url);
    }

    getById(itemCode: string): Observable<IReceivingItem> {
        return this.http.get<IReceivingItem>(`${this.apiUrl}/${btoa(itemCode)}`);
    }


    update(model: IReceivingItem): Observable<IReceivingItem> {
        return this.http.put<IReceivingItem>(`${this.apiUrl}/${ReceivingItem.getInternalId(model)}`, model);
    }

    getMetadados(itemCode: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/metadados/${btoa(itemCode)}`);
    }

}
