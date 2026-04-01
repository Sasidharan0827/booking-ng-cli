import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppoinmentServiceService {
  apiurl = environment.apiBaseUrl;
  getdocdetails(doctor_id: any) {
    console.log(doctor_id);
    return this.http.get(`${this.apiurl}doctor/${doctor_id}`);
  }
  getConDetails(appoinmentId: any) {
    return this.http.get(`${this.apiurl}/appoinment/${appoinmentId}`);
  }

  constructor(private http: HttpClient) {}
  conUrl = `${this.apiurl}/doctor`;
  getDayConsultation(doc_id: number, dayOfWeek: string): Observable<any> {
    const url = `${this.conUrl}/${doc_id}/consultations/${dayOfWeek}`;
    return this.http.get(url);
  }
  private baseUrl = `${this.apiurl}/appoinment/`;
  createAppointment(formData: any) {
    return this.http.post(`${this.baseUrl}`, formData);
  }
}
