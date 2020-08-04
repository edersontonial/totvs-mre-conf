import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PoDisclaimer } from '@po-ui/ng-components';
import { TotvsResponse } from '../interfaces/totvs-response.interface';
import { ISeries } from '../model/series.model';

@Injectable()
export class SeriesService {

    private apiUrl = '/dts/datasul-rest/resources/prg/cdp/v1/series';

    constructor(private http: HttpClient) { }

    query(filters: PoDisclaimer[], page = 1, pageSize = 20): Observable<TotvsResponse<ISeries>> {

        let url = `${this.apiUrl}?pageSize=${pageSize}&page=${page}`;
        if (filters && filters.length > 0) {

            const urlParams = new Array();
            filters.map(filter => {
                urlParams.push(`${filter.property}=${filter.value}`);
            });
            url = `${url}&${urlParams.join('&')}`;
        }

        return this.http.get<TotvsResponse<ISeries>>(url);
    }

    /* Métodos usados no Zoom - lookup */
    getFilteredData(filter: string, page: number, pageSize: number): Observable<ISeries> {
        const header = { params: {order: 'seriesCode', page: page.toString(), pageSize: pageSize.toString() } };

        if (filter && filter.length > 0) {
            header.params['seriesCode'] = filter;
        }

        return this.http.get<ISeries>(`${this.apiUrl}`, header);
    }

    getObjectByValue(id: string): Observable<ISeries> {
        return this.http.get<ISeries>(`${this.apiUrl}/${btoa(id)}`); // Base64 - série pode ser 1/1
    }
}
