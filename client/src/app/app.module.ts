import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AllSurveysModule } from './all-surveys/all-surveys.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { PartialsModule } from './partials/partials.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    PartialsModule, 
    AllSurveysModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
