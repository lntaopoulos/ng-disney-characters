import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { DISNEY_API_BASE_URL, getQueryParams, Params } from '../../shared/utilities/resource-utilities'
import { CharacterAPIResponseModel } from './models/character.model'

@Injectable()
export class CharacterResource {
  private baseUrl = DISNEY_API_BASE_URL

  constructor(private http: HttpClient) {}

  /**
   *
   * @param {Params} {name, pageSize, page}
   * @return {*}  {Observable<CharacterAPIResponseModel>}
   */
  get(params: Params): Observable<CharacterAPIResponseModel> {
    const url = `${this.baseUrl}/character`
    const queryParams = getQueryParams(params)

    return this.http.get(url, { params: queryParams }).pipe(map((response) => response as CharacterAPIResponseModel))
  }
}
