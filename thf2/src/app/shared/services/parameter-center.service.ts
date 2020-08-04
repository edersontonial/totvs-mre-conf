import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PoMenuItem } from '@po-ui/ng-components';
import { TotvsResponse } from 'dts-backoffice-util';


@Injectable()
export class ParameterCenterService {

    private apiUrl = '/dts/datasul-rest/resources/prg/rep/v1/parameterCenter';

    constructor(private http: HttpClient) { }

    getMenu(): Observable<TotvsResponse<PoMenuItem>> {
        return this.http.get<TotvsResponse<PoMenuItem>>(`${this.apiUrl}/menu`);
    }
}
