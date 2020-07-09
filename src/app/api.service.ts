import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getApiVersion(): Subject<string> {
    let subject = new Subject<string>();

    this.httpClient.get('').subscribe((res: any) => {
      subject.next(res.data.attributes.version);
    });

    return subject;
  }
}
