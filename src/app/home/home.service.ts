import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) {}

  getCities() {
    return this.http.get('cities').toPromise();
  }
}