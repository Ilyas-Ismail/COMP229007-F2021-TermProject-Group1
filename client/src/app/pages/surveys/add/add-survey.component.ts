import { Component, OnInit } from '@angular/core';
import { Survey, Question } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SurveyRepository } from 'src/app/models/survey.repository';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css']
})
export class AddSurveyComponent{
  survey: Survey = new Survey();
    
  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private repository: SurveyRepository,
    activeRoute: ActivatedRoute
  ) { 

    //  this.survey.Questions = new;

  }


  saveSurvey(form: NgForm){
    this.repository.saveTitle(this.survey);
    this.router.navigateByUrl("survey/question/edit/"+this.survey._id);
    // this.routersurveys/new/question/`]);
  
  };

    // this.surveyService.create(data, 'add')
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.router.navigate([`surveys/new/question/${res._id}`]);
    //     },
    //     error: (e) => console.error(e)
    //   });
  }

