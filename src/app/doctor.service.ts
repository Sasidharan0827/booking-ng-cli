import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}
  apiurl = environment.apiBaseUrl.replace(/\/?$/, '/');

  getDoctors() {
    return this.http.get<any[]>(`${this.apiurl}doctor`);
  }

  selectDoctor(doctorId: number) {
    return this.http.get<any>(`${this.apiurl}doctor/${doctorId}`);
  }
}
