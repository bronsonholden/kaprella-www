import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResourceApiService } from './resource-api.service';

@Injectable({
  providedIn: 'root'
})
export class FieldApiService extends ResourceApiService {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  resourceName(): string {
    return 'fields';
  }

}
