import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from '../core/constants/service_constants';
import { Observable } from 'rxjs';
import { IValidation } from '../core/models/service_models';

@Injectable({providedIn: "root"})
export class DataService {

  http: HttpClient;

  constructor(private _http: HttpClient) { 
    this.http = _http;
  }

  validateList(ACCESS_CODE: string, listToValidate: IValidation): Observable<any> {
    return this.http.get(`${API_ENDPOINT}/movies`, {
        headers: { 'x-chmura-cors' : ACCESS_CODE }
    });
  }

}

