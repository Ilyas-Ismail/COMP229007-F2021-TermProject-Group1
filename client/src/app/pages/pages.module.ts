import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BasePageComponent } from './base-page/base-page.component';
import { ListComponent } from './surveys/list/list.component';
import { DetailsComponent } from './surveys/details/details.component';
import { ListTableComponent } from './surveys/list-table/list-table.component';
import { AddSurveyComponent } from './surveys/add/add-survey.component';
import { AddQuestionComponent } from './surveys/add/add-question.component';
import { EditSurveyComponent } from './surveys/edit/edit-survey.component';
import { EditTitleComponent } from './surveys/edit/edit-title.component';
import { EditQuestionComponent } from './surveys/edit/edit-question.component';
import { DeleteComponent } from './surveys/delete/delete.component';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        MatRadioModule
    ],
    declarations: [
        HomeComponent,
        BasePageComponent,
        ListComponent,
        DetailsComponent,
        ListTableComponent,
        AddSurveyComponent,
        AddQuestionComponent,
        EditSurveyComponent,
        EditTitleComponent,
        EditQuestionComponent,
        DeleteComponent
    ],
    exports: [
        HomeComponent,
        BasePageComponent
    ]
})
export class PagesModule { }
