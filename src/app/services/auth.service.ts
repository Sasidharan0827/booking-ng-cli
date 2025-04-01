import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })
export class AuthService {

    private token: string | null = null;
  private userData: any = null;

    API_BASE_DOMAIN = 'http://localhost:3000';

    constructor( private httpClient:HttpClient) {

    
    }
    


    signIn(Email:string, pwd:string) :Observable<any> {
        let url = `${this.API_BASE_DOMAIN}/auth/signin`;
        let data = {    
            emailId:Email,
            password:pwd
        }
        return this.httpClient.post<any>(url,data);
    }



    signup(name: string, UserEmail: string, password: string,phone:string,dob:string,address:string): Observable<any> {
        let url = `${this.API_BASE_DOMAIN}/auth/signup`;
        let data = {
            name:name,
            emailId:UserEmail,
            password: password,
            phone:phone,
            dob:dob,
            address:address
        
        };
        return this.httpClient.post<any>(url, data);
    }
    appoinment(pname:string,date:string,time:string,page:string,phone:string){
        let url = `${this.API_BASE_DOMAIN}/appoinment`;
        let data = {
            
            pname:pname,
            date:date,
            time: time,
            page:page,
            phone:phone,
        
        };
        return this.httpClient.post<any>(url, data);
    }
    
 
  setSession(token: string, userData: any): void {
    this.token = token;
    this.userData = userData;
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    this.token = localStorage.getItem('token');
    console.log('Token:', this.token);
    console.log(this.isLoggedIn);
    return this.token !== null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  // Add this method to retrieve the user data (NEW METHOD)
  getUserData(): any {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  // Optional: Clear session data (e.g., on logout)
  clearSession(): void {
    this.token = null;
    this.userData = null;
  }
}