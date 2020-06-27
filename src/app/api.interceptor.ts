import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiBase = environment.apiBase;

    /* Intercepts only JSON API requests that don't start with the API base
     * URL.
     */
    if (request.url.startsWith(apiBase) || request.responseType !== 'json') {
      return next.handle(request);
    }

    let parts = [apiBase, request.url];

    const clonedRequest = request.clone({
      url: parts.join('/')
    });

    // Return cloned request with prepended API base URL
    return next.handle(clonedRequest);
  }
}
