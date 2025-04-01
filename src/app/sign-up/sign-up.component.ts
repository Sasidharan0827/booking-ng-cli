import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  @ViewChild ('SUF') signupForm: NgForm | null = null;

  constructor(private authService: AuthService, private router: Router) {}
  navigateToSignIn() {
    this.router.navigate(['/sign-in']);
  }

  onSubmit() {
    console.log('dump => ', this.signupForm);
  }

  changeName() {
    console.log('dump => ', this.signupForm?.value);
  }

  

  onSignup() {
    console.log('dump => ', this.signupForm?.value);

    let name = this.signupForm?.value.name;
    let emailId = this.signupForm?.value.email;
    let password = this.signupForm?.value.password;
    let phone =this.signupForm?.value.phone;
    let dob =this.signupForm?.value.dob;
    let address =this.signupForm?.value.address;
    this.authService.signup(name, emailId, password,phone,dob,address).subscribe(
      {
      next: (x) => {
        console.log(' success data result ', x);

        localStorage.setItem('token', x.access_token);

        this.router.navigateByUrl('sign-in');
      },
      error: (err) => {
        console.error('error ', err);
      },
      complete:() => {
        console.info("complete called for signup")
      }
    }
  );
  }
}
