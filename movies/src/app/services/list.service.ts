import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from '../core/constants/service_constants';
import { Observable, firstValueFrom, map } from 'rxjs';
import { IActor, IMovie, IValidation } from '../core/models/service_models';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  constructor(private readonly http: HttpClient) { }

  actors: IActor[] = []

  async getMovies(ACCESS_CODE: string): Promise<IMovie[]> {
    const res = await firstValueFrom(this.http.get<IMovie[]>(`${API_ENDPOINT}/movies`, {
        headers: { 'x-chmura-cors' : ACCESS_CODE }
    }))
    return res
  }

   async getActors(ACCESS_CODE: string): Promise<IActor[]> {
    const res = await firstValueFrom(this.http.get<IActor[]>(`${API_ENDPOINT}/actors`, {
      headers: { 'x-chmura-cors' : ACCESS_CODE }
    }))
    return res
  }

  async validateList(ACCESS_CODE: string, listToValidate: IValidation[]) {
    const res = await firstValueFrom(this.http.post(`${API_ENDPOINT}/validation`, listToValidate, {
      headers: { 'x-chmura-cors' : ACCESS_CODE }, observe: "response"
    }))
    return res
  }
}
