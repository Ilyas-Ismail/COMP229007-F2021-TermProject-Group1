import { Component} from '@angular/core';
import { NgModule } from '@angular/core';
import { MC_SurveyRepository } from '../model/mc_survey.repository';
import { MC_Survey } from '../model/mc_survey.model';

@Component({
  selector: 'app-all-surveys',
  templateUrl: './all-surveys.component.html',
  styleUrls: ['./all-surveys.component.css']
})
export class AllSurveysComponent{

  constructor(private repository: MC_SurveyRepository) { }

  get mc_surveys(): MC_Survey[]{
    return this.repository.getMCSurveys();
  }
}
