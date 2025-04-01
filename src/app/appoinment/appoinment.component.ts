import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AppoinmentServiceService } from '../appoinment-service.service';
import { Consultation } from './appoinmentdto';
@Component({
  selector: 'app-appoinment',
  templateUrl: './appoinment.component.html',
  styleUrls: ['./appoinment.component.scss']
})
export class AppoinmentComponent {





  appoinment = '/assets/img10.jpg';
  @ViewChild ('APO') appoinmentForm: NgForm | null = null;
  doctor: any;
  formData = {
    name: '',
    dob: '',
    docname: '',
    specalist: '',
    date: '',
    day: '',
    start_time:'',
    userId: "",  
    con_id: "" ,  
  };
  dayOfWeek: string='';
  consultations: any[]=[];
  selectedSession: string='';
  sessions = ['morning', 'afternoon', 'evening'];
  sessiontime: any[]=[];
  sessionDetails: Consultation[] = [];
  filteredConsultation: any;

  user: any;
  constructor(private authService: AuthService, private router: Router, private appointmentservice:AppoinmentServiceService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.doctor = navigation.extras.state['doctor'];
      this.user=navigation.extras.state['user'];
      
      console.log("recived user---->",this.user);
      console.log("recived user---->",this.doctor);
      this.formData.userId = this.user?.id;

    }
   
    
 
  }
 
  
  onback(){
    let url="/ ";
    this.router.navigateByUrl(url)
  }

  findDayOfWeek(date: string): void {
    const enteredDate = moment(date, 'YYYY/MM/DD');
    this.dayOfWeek = enteredDate.isValid() ? enteredDate.format('dddd') : '';
    console.log('Entered date:', date);
    console.log('Day of the week:', this.dayOfWeek);
    if (this.doctor && this.doctor.doc_id) {
      this.appointmentservice.getDayConsultation(this.doctor.doc_id, this.dayOfWeek).subscribe({
        next: (response) => {
          console.log('Consultations for selected day:', response);
          this.consultations = response.consultations;
          this.filterConsultation();
        },
        error: (error) => {
          console.error('Failed to get consultations for selected day:', error);
        }
      });
    } else {
      console.error('No doctor selected.');
    }}
  selectSession(session: string): void {
    this.selectedSession = session;
    this.filterConsultation();
  }
  

    
    
    filterConsultation(): void {
      console.log('Selected Session:', this.selectedSession);
      this.filteredConsultation = this.consultations.find(consultation => {
        console.log('Comparing:', consultation.session.toLowerCase(), 'with', this.selectedSession.toLowerCase());
        return consultation.session.toLowerCase() === this.selectedSession.toLowerCase();
      });
      if (!this.filteredConsultation) {
        this.filteredConsultation = { start_time: '' }; 
      }
      console.log('Filtered Consultation:', this.filteredConsultation);
      console.log('Filtered Start Time:', this.filteredConsultation.start_time);
    }




    OnBook_Appoinment() {
      this.formData.con_id = this.filteredConsultation ? this.filteredConsultation.con_id : null;
      this.appointmentservice.createAppointment(this.formData)
        .subscribe({
          next: response => {
           this.router.navigateByUrl('/response', { state: { response: response } });
           console.log('Appointment created successfully:', response);    
          },
          error: error => {
            console.error('Error creating appointment:', error);
          }
        });
      }
  }
















