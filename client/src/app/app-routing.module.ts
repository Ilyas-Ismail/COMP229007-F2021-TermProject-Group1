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
import { DeleteComponent } from './pages/surveys/delete/delete.component';
import { LoginComponent } from './pages/auth/login.component';
import { RegisterComponent } from './pages/auth/register.component';
import { AuthGuard } from "./pages/auth/auth.guard";

const routes: Routes = [
  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: 'surveys/list', component: ListComponent, data: {title: 'Survey List'}},
  {path: 'surveys/details/:id', component: DetailsComponent, data: {title: 'Survey Contents'}},
  // add a new survey w/ title
  {path: 'surveys/new', component: AddSurveyComponent, canActivate: [AuthGuard], data: {title: 'New Survey'}},
  // add Q & C
  {path: 'surveys/new/question/:id', component: AddQuestionComponent, canActivate: [AuthGuard], data: {title: 'New Survey'}},
  // edit page
  {path: 'surveys/edit/view/:id', component: EditSurveyComponent, canActivate: [AuthGuard], data: {title: 'Edit Survey'}},
  // edit title
  {path: 'surveys/edit/title/:id', component: EditTitleComponent, canActivate: [AuthGuard], data: {title: 'Edit Survey'}},
  // edit Q & C
  {path: 'surveys/edit/question/:id/:idx', component: EditQuestionComponent, canActivate: [AuthGuard], data: {title: 'Edit Survey'}},
  // delete
  {path: 'surveys/delete/:id', component: DeleteComponent, canActivate: [AuthGuard], data: {title: 'Delete Survey'}},
  // log in & out
  {path: 'login', component: LoginComponent, data: {title: 'Log in'}},
  {path: 'register', component: RegisterComponent, data: {title: 'Log in'}},
  // refresh
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
