import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { PoDisclaimer } from '@po-ui/ng-components';

import { TotvsResponse } from 'dts-backoffice-util';
import { IReplicationData } from '../model/replication-data.model';

@Injectable()
export class ReplicationDataFamilyService {

    // FIXME: Ajuste o módulo
    private apiUrl = '/dts/datasul-rest/resources/prg/rep/v1/receivingFamily/replicationData';


    constructor(private http: HttpClient) { }

    query(filters: PoDisclaimer[], page = 1, pageSize = 20): Observable<TotvsResponse<IReplicationData>> {

        let url = `${this.apiUrl}?pageSize=${pageSize}&page=${page}`;

        if (filters && filters.length > 0) {

            const urlParams = new Array<string>();

            filters.map(filter => {
                urlParams.push(`${filter.property}=${filter.value}`);
            });

            url = `${url}&${urlParams.join('&')}`;
        }

        return this.http.get<TotvsResponse<IReplicationData>>(url);
    }

    update(model: IReplicationData): Observable<IReplicationData> {
        return this.http.put<IReplicationData>(`${this.apiUrl}`, model);
    }
}
