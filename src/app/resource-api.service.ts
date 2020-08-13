import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Resource } from './models/resource';
import { isArray } from 'lodash-es';

export abstract class ResourceApiService {

  constructor(protected httpClient: HttpClient) { }

  abstract resourceName(): string;

  create(resource: Resource) {
    return this.httpClient.post(this.resourceName(), {
      data: resource
    });
  }

  get(id) {
    return this.httpClient.get(`/${this.resourceName()}/${id}`);
  }

  index(offset, limit, query = {}) {
    let params = new HttpParams().set('page[offset]', offset).set('page[limit]', limit);

    const hashParams = [];
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

    for (const param of arrayParams) {
      const paramKey = `${param}[]`;
      let array = query[param] || [];
      if (!isArray(array)) {
        array = [array];
      }
      for (let val of array) {
        params = params.append(paramKey, val);
      }
    }

    let paramObj = {};

    params.keys().forEach(key => {
      paramObj[key] = params.getAll(key);
    });

    // Handle generate expressions (need to be encoded completely, not
    // partially like Angular does by default with all query param values)
    const generators = query['generate'];

    if (!!generators) {
      // paramObj['generate'] = {};
      Object.keys(generators).forEach(key => {
        paramObj[`generate[${encodeURIComponent(key)}]`] = encodeURIComponent(generators[key]);
      });
    }

    return this.httpClient.get(this.resourceName(), { params: paramObj });
  }

}
