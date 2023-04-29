import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { DISNEY_API_BASE_URL, getQueryParams, Params } from '../../shared/utilities/resource-utilities'

@Injectable()
export class CharacterResource {
  private baseUrl = DISNEY_API_BASE_URL

  constructor(private http: HttpClient) {}

  getCharacters(params: Params = {}): Observable<any> {
    const url = `${this.baseUrl}/character`
    const queryParams = getQueryParams(params)

    return this.http.get(url, { params: queryParams }).pipe(map((response) => response as any))
  }
}
