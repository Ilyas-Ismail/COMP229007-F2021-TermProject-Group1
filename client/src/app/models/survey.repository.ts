import { Injectable } from '@angular/core';
import { Survey } from './survey.model';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class SurveyRepository
{
  private surveys: Survey[] = [];
  private titles: string[] = [];

  constructor(private dataSource: RestDataSource)
  {
    dataSource.getSurveys().subscribe(data => {
      this.surveys = data;

      // this.titles = data.map(b => b.title)
        // .filter((a, index, array) => array.indexOf(a) === index).sort() as string[];
    });
  }

    saveTitle(survey: Survey){
      this.dataSource.insertSurvey(survey).subscribe(p => this.surveys.push(p));
    
    }

    getSurvey(id: string): Survey{
      return (this.surveys.find(survey => survey._id ===id)!);
    }
  // getSurveys(title: string = undefined as unknown as string): Survey[]
  // {
  //   return this.surveys
  //     .filter(b => title == null || title === b.title);
  // }

  // getMCSurvey(id: string): Survey
  // {
   
  //   return this.surveys.find(b => b._id === id) as Survey;
  // }

  // getTitles(): string[]
  // {
  //   return this.titles;
  // }
}