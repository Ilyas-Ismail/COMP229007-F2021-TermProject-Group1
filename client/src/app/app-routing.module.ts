import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/surveys/list/list.component';
import { DetailsComponent } from './pages/surveys/details/details.component';
import { AddSurveyComponent } from './pages/surveys/add/add-survey.component';
import { AddQuestionComponent } from './pages/surveys/add/add-question.component';
import { EditSurveyComponent } from './pages/surveys/edit/edit-survey.component';
import { EditTitleComponent } from './pages/surveys/edit/edit-title.component';
import { EditQuestionComponent } from './pages/surveys/edit/edit-question.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: 'surveys/list', component: ListComponent, data: {title: 'Survey List'}},
  {path: 'surveys/details/:id', component: DetailsComponent, data: {title: 'Survey Contents'}},
  // add a new survey w/ title
  {path: 'surveys/new', component: AddSurveyComponent, data: {title: 'New Survey'}},
  // add Q & C
  {path: 'surveys/new/add', component: AddQuestionComponent, data: {title: 'New Survey'}},
  // edit page
  {path: 'surveys/edit', component: EditSurveyComponent, data: {title: 'Edit Survey'}},
  // edit title
  {path: 'surveys/edit/:id', component: EditTitleComponent, data: {title: 'Edit Survey'}},
  // edit Q & C
  {path: 'surveys/edit/:id/:idx', component: EditQuestionComponent, data: {title: 'Edit Survey'}},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
