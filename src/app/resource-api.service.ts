import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

import { isArray } from 'lodash';

export abstract class ResourceApiService {

  constructor(protected httpClient: HttpClient) { }

  abstract resourceName(): string;

  create(attributes = {}, relationships = {}) {
    return this.httpClient.post(this.resourceName(), {
      data: {
        type: this.resourceName(),
        attributes,
        relationships
      }
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

    for (let param of arrayParams) {
      const paramKey = `${param}[]`;
      let array = query[paramKey] || [];
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
