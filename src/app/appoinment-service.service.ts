import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppoinmentServiceService {

  constructor(private http: HttpClient) { }
  conUrl='http://localhost:3000/doctor'
  getDayConsultation(doc_id: number, dayOfWeek: string,): Observable<any> {
    const url = `${this.conUrl}/${doc_id}/consultations/${dayOfWeek}`;
    return this.http.get(url);
  }
  private baseUrl = 'http://localhost:3000/appoinment';
  createAppointment(formData: any) {
    return this.http.post(`${this.baseUrl}`,formData);
  }
}
