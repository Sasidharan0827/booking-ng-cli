import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { state } from '@angular/animations';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
 
  @ViewChild('SIF') signinForm: NgForm | null = null;
  constructor(private authService: AuthService, private router:Router) {}
  navigateToSignUp() {
    this.router.navigate(['/sign-up']);
  }

  onLogin() {
    console.log('dump => ', this.signinForm?.value);

    let emailId = this.signinForm?.value.email;
    let password = this.signinForm?.value.password;
    if (!emailId || !password) {
      console.error('Email and password are required');
      return;
  }
    this.authService.signIn(emailId, password).subscribe(
      {
        next: (x) => {
          console.log(' success data result ', x);

          localStorage.setItem('token', x.access_token);
          localStorage.setItem('user', JSON.stringify(x.user));
          this.router.navigate(['/']),{state :{user:x.user},
        };
        console.log("passing the user to home page",x.user)
        },
        error: (err) => {
          console.error('error ', err);
        }
      }
    );
}

}
