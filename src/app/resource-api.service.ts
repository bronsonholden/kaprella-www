import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

export abstract class ResourceApiService {

  constructor(protected httpClient: HttpClient) { }

  abstract resourceName(): string;

  index(offset, limit, query) {
    let params = new HttpParams().set('page[offset]', offset).set('page[limit]', limit);

    const hashParams = [
      'generate'
    ];

    const arrayParams = [
      'filter',
      'sort'
    ]

    for (let param of hashParams) {
      const hash = query[param] || {};
      for (let key in hash) {
        params = params.append(`${param}[${key}]`, hash[key]);
      }
    }

    for (let param of arrayParams) {
      const array = query[param] || [];
      for (let val of array) {
        params = params.append(`${param}[]`, val);
      }
    }

    return this.httpClient.get(this.resourceName(), { params });
  }

}
