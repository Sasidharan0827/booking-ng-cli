import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';

import { ResponseComponent } from './response/response.component';
import { AppoinmentComponent } from './appoinment/appoinment.component';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'sign-in',
    component:SignInComponent,
  },
  {
    path:'sign-up',
    component:SignUpComponent
  },
  {
    path:'appoinment',
    component:AppoinmentComponent
  },
  {
    path:'response',
    component:ResponseComponent
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
