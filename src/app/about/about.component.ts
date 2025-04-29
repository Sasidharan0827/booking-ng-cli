import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import * as Aos from 'aos';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  constructor(private router: Router) {}
  login() {
    this.router.navigate(['/sign-in']);
  }
  ngOnInit() {
    Aos.init({
      duration: 800, // animation duration
      once: true, // animate only once
    });
  }
}
