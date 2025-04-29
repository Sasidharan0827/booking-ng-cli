import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppoinmentComponent } from './appoinment/appoinment.component';
import { ResponseComponent } from './response/response.component';

import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { MissionComponent } from './mission/mission.component';
import { DocListComponent } from './doc-list/doc-list.component';
import { OurServiceComponent } from './our-service/our-service.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    AppoinmentComponent,
    ResponseComponent,

    FooterComponent,
    AboutComponent,
    MissionComponent,
    DocListComponent,
    OurServiceComponent,
    ContactComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
