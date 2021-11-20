import { Component, OnInit } from '@angular/core';
import { MC_Survey } from 'src/app/model/mc_survey.model';
import { MC_SurveyRepository } from 'src/app/model/mc_survey.repository';
import { ModelModule } from 'src/app/model/model.module';
import { SurveysComponent } from '../surveys/surveys.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit(): void {
  }

  newMCSurvey: MC_Survey = new MC_Survey();

  get jsonMCSurvey(){
    return JSON.stringify(this.newMCSurvey);
  }

  addMCSurvey(s: MC_Survey){
    console.log("new survey:" + this.jsonMCSurvey)
    this.router.navigateByUrl('/surveys');
  }

  // selectedSurvey: MC_Survey | undefined;

  // getSelectedSurvey(): MC_Survey{
  //   return this.surveyComponent.selectedSurvey as MC_Survey;
    

  // }

}
