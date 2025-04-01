import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent {
  imageUrl = "/assets/RESPONSE.png";
  appointmentDetails: any;
  doctorDetails: any;
  response: any;

  
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.response = navigation.extras.state['response'];
     
      
      console.log("recived details---->",this.response);
     
    }
  }

 
}