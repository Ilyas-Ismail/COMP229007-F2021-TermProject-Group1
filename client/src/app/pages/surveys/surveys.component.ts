import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';
import { ActivatedRoute } from '@angular/router';
import { MC_SurveyRepository } from 'src/app/model/mc_survey.repository';
import { MC_Survey } from 'src/app/model/mc_survey.model';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent extends BasePageComponent implements OnInit {

  constructor(route: ActivatedRoute, private repository: MC_SurveyRepository) {
    super(route);
   }

  override ngOnInit(): void {
  }

  get surveys(): MC_Survey[]{
    return this.repository.getMCSurveys();
  }
}
