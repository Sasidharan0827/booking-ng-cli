import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppoinmentServiceService } from '../appoinment-service.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss'],
})
export class ResponseComponent {
  imageUrl = '/assets/RESPONSE.png';
  image_10 = '/assets/img10.jpg';
  appointmentDetails: any;
  doctorDetails: any;
  response: any;
  appoinmentId: any;
  doctor_id: any;
  doctor: any;
  doctor_name: any;

  constructor(
    private router: Router,
    private conservice: AppoinmentServiceService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.response = navigation.extras.state['response'];

      console.log('recived details---->', this.response);
      this.appoinmentId = this.response.id;
    }
  }
  ngOnInit() {
    this.getappoinmentdata();
  }
  getappoinmentdata() {
    this.conservice.getConDetails(this.appoinmentId).subscribe({
      next: (response) => {
        console.log(
          'getting the appoinment details to show the user',
          response
        );
        this.doctor_id = response;
        console.log(
          ' fetching the data for showing the data',
          this.doctor_id.consultaion.doc_id
        );
        console.log('day of appoinment', this.doctor_id.consultaion.day);

        console.log(' User name-------------->', this.doctor_id.user.name);
        console.log(' consultation Date-------------->', this.doctor_id.date);
        this.conservice
          .getdocdetails(this.doctor_id.consultaion.doc_id)
          .subscribe({
            next: (response) => {
              console.log(
                ' getting the doctor details to show in the response page',
                response
              );
              this.doctor_name = response;
              console.log(' doctor name----->', this.doctor_name.docname);
              console.log(
                ' doctor specialist----->',
                this.doctor_name.specalist
              );
            },
            error: (err) => {
              console.log('unable to fetch the doctor id ');
            },
          });
      },
      error: (err) => {
        console.log('unable get the booked appoinment details ', err);
      },
    });
  }
  home() {
    this.router.navigate(['']);
  }
}
