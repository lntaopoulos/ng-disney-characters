import { HttpParams } from '@angular/common/http'

export const DISNEY_API_BASE_URL = 'https://api.disneyapi.dev'
export type Params = Record<string, any>

export function getQueryParams(params: Params): HttpParams {
  let httpParams = new HttpParams()

  Object.keys(params).forEach((key: string) => {
    httpParams = httpParams.set(key, params[key])
  })

  return httpParams
}
