import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { BasePageComponent } from './base-page/base-page.component';
import { SurveysComponent } from './surveys/surveys.component';
import { AddEditComponent } from './add-edit/add-edit.component';
// import { AllSurveysModule } from '../all-surveys/all-surveys.module';


@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [
        AboutComponent,
        ContactComponent,
        HomeComponent,
        SurveysComponent,
        BasePageComponent,
        AddEditComponent
    ],
    exports: [
        AboutComponent,
        ContactComponent,
        HomeComponent,
        SurveysComponent,
        BasePageComponent
    ]
})
export class PagesModule { }
