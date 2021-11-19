import { NgModule } from '@angular/core';
import { MC_SurveyRepository } from "./mc_survey.repository";
import { StaticDataSource } from "./static.datasource";

@NgModule({
    providers: [MC_SurveyRepository, StaticDataSource]
})
export class ModelModule {}