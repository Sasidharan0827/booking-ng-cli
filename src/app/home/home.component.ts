import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  imageUrl = '/assets/doc2.jpg';
  service = '/assets/service.jpg';

  doctors: any[] = [];
  user: any;

  constructor(
    private doctorService: DoctorService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.fetchDoctors();
  }
  ngOnInit(): void {
    this.fetchDoctors();

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['user']) {
      this.user = navigation.extras.state['user'];
      console.log('Logged in user ', this.user);
    } else {
      // Optionally, you can load the user from localStorage if state is not available
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
      console.log(this.user, 'This is the user loaded from localStorage');
    }
  }

  fetchDoctors() {
    this.doctorService.getDoctors().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
        console.log('doctors', doctors);
      },
      error: (error) => {
        console.error('Failed to fetch doctors:', error);
      },
    });
  }

  selectDoctor(doctorId: number) {
    console.log('Selected Doctor:', doctorId);

    const isLoggedIn = this.authService.isLoggedIn();
    console.log('loggin value', isLoggedIn);

    const userData = this.authService.getUserData();
    console.log('User Data:', userData);

    this.doctorService.selectDoctor(doctorId).subscribe({
      next: (response) => {
        console.log('Doctor selected successfully:', response);
        // localStorage.setItem('selectedDoctor', JSON.stringify(response));
        // localStorage.setItem('userData', JSON.stringify(userData));
        this.router.navigate(['appoinment'], {
          state: { doctor: response, user: userData },
        });
        console.log('passed user from home==>', userData);
        console.log('passed doctor from home===>', response);
      },
      error: (error) => {
        console.error('Failed to select doctor:', error);
      },
    });
  }
  login() {
    this.router.navigate(['/sign-in']);
  }
}
