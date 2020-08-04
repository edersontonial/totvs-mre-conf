import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IInputConverterParameters } from '../model/input-converter-parameters.model';

@Injectable()
export class InputConverterParametersService {

    private apiUrl = '/dts/datasul-rest/resources/prg/rep/v1/inputConverterParameters';

    constructor(private http: HttpClient) { }

    get(): Observable<IInputConverterParameters> {
        return this.http.get<IInputConverterParameters>(this.apiUrl);
    }

    update(model: IInputConverterParameters): Observable<IInputConverterParameters> {
        return this.http.post<IInputConverterParameters>(this.apiUrl, model);
    }

    getMetadados(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/metadados`);
    }

}
