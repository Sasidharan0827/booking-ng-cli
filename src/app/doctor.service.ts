import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  getDoctors() {
    return this.http.get<any[]>('http://localhost:3000/doctor');
  }

  selectDoctor(doctorId: number) {
    return this.http.get<any>(`http://localhost:3000/doctor/${doctorId}`);
  }
}
