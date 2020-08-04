import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PoDisclaimer, PoDynamicFormFieldChanged, PoDynamicFormValidation } from '@po-ui/ng-components';
import { TotvsResponse } from '../interfaces/totvs-response.interface';
import { IUserParameters } from '../model/user-parameters.model';

@Injectable()
export class UserParametersService {

    private apiUrl = '/dts/datasul-rest/resources/prg/rep/v1/userParameters';

    constructor(private http: HttpClient) { }

    query(filters: PoDisclaimer[], page = 1, pageSize = 20): Observable<TotvsResponse<IUserParameters>> {

        let url = `${this.apiUrl}?pageSize=${pageSize}&page=${page}`;
        if (filters && filters.length > 0) {
            const urlParams = new Array();
            filters.map(filter => {
                urlParams.push(`${filter.property}=${filter.value}`);
            });
            url = `${url}&${urlParams.join('&')}`;
        }
        return this.http.get<TotvsResponse<IUserParameters>>(url);
    }

    getById(id: string): Observable<IUserParameters> {
        return this.http.get<IUserParameters>(`${this.apiUrl}/${id}`);
    }

    create(model: IUserParameters): Observable<IUserParameters> {
        return this.http.post<IUserParameters>(`${this.apiUrl}`, model);
    }

    update(model: IUserParameters): Observable<IUserParameters> {
        return this.http.put<IUserParameters>(`${this.apiUrl}/${model.userCode}`, model);
    }

    delete(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    getMetadados(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/metadadosUserRec`);
    }

    getMetadata(type: string, id: string): Observable<any> {
        if (!id) {
            id = '';
        }
        return this.http.get<any>(`${this.apiUrl}/metadata/${id}?type=${type}`);
    }

    getMetadataList(): Observable<any> {
        return this.getMetadata('list', '');
    }

    validate(changedValue: PoDynamicFormFieldChanged, endpoint: string): Observable<PoDynamicFormValidation> {
        return this.http.post<PoDynamicFormFieldChanged>(endpoint, changedValue);
    }
}
