import { NgModule } from '@angular/core';
import { StaticDataSource } from '../model/static.datasource';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ModelModule } from '../model/model.module';
import { AllSurveysComponent } from './all-surveys.component';

@NgModule({
    imports: [ModelModule, BrowserModule, FormsModule], 
    declarations:[AllSurveysComponent], 
    exports: [AllSurveysComponent]
})
export class AllSurveysModule{}