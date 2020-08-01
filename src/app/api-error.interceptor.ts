import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        this.snackBar.open('Unable to connect to API server', 'OK', {
          duration: 5000
        });

        return throwError(error);
      }

      let messages = error.error.errors.map(item => {
        if (typeof item === 'string') {
          return item;
        }

        if (typeof item.detail === 'string') {
          return item.detail;
        }

        if (typeof item.title === 'string') {
          return item.title;
        }

        return 'An unknown error occurred';
      });

      let message;

      if (messages.length === 1) {
        message = messages[0];
      } else if (messages.length > 0) {
        message = `${messages[0]} (+${messages.length - 1} more)`
      } else {
        message = 'An unknown error occurred';
      }

      this.snackBar.open(message, 'OK', {
        duration: 5000
      });

      return throwError(error);
    }));
  }
}
