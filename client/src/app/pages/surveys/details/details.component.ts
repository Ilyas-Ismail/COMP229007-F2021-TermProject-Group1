import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from "@angular/forms";
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { SurveyResponse } from 'src/app/models/survey_response.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  survey!: Survey;
  surveyResponse: SurveyResponse = {
    surveyID: '',
    choices: []
  };
  detailForm: FormArray = this.formBuilder.array([]);

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getSurvey(this.route.snapshot.params["id"]);
  }

  getSurvey(id: string): void {
    this.surveyService.get(id)
      .subscribe({
        next: (data) => {
        this.survey = data;
        console.log(this.survey);
        this.initForm();
      },
        error: (e) => console.error(e)
      });
  }

  initForm():void {
    for (let i = 0; i < this.survey.Questions!.length; i++) {
      this.detailForm.push(this.newChoice());
    }
  }

  newChoice():FormGroup {
    return this.formBuilder.group({
      choice: ['']
    });
  }

  getChoice(index:number):FormGroup {
    return this.detailForm.at(index) as FormGroup;
  }

  onSubmit():void {
    this.surveyResponse.surveyID = this.survey._id;
    
    this.detailForm.value.forEach((e : any) => {
      this.surveyResponse.choices!.push(e.choice);
    });
    // save user response into the database
    this.surveyService.create(this.surveyResponse, 'addres')
      .subscribe({
        next: (res) => {
          // res is a stored user response in the database
          console.log(res);
          this.router.navigate([`surveys/list`]);
        },
        error: (e) => console.error(e)
      });
  }
}