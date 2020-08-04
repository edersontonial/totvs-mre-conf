import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IReceivingParameters } from '../model/receiving-parameters.model';

@Injectable()
export class ReceivingParametersService {

    private apiUrl = '/dts/datasul-rest/resources/prg/rep/v1/receivingParameters';

    constructor(private http: HttpClient) { }

    get(): Observable<IReceivingParameters> {
        return this.http.get<IReceivingParameters>(this.apiUrl);
    }

    update(model: IReceivingParameters): Observable<IReceivingParameters> {
        return this.http.post<IReceivingParameters>(this.apiUrl, model);
    }

    getMetadados(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/metadados`);
    }

}
