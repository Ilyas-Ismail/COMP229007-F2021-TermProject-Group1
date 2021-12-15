// import { Injectable } from '@angular/core';
// import { MC_Survey } from './mc_survey.model';
// import { StaticDataSource } from './static.datasource';

// @Injectable()
// export class MC_SurveyRepository
// {
//   private mc_surveys: MC_Survey[] = [];
//   private titles: string[] = [];

//   constructor(private dataSource: StaticDataSource)
//   {
//     dataSource.getMCSurveys().subscribe(data => {
//       this.mc_surveys = data;
//       this.titles = data.map(b => b.title)
//         .filter((a, index, array) => array.indexOf(a) === index).sort() as string[];
//     });
//   }

//   getMCSurveys(title: string = undefined as unknown as string): MC_Survey[]
//   {
//     return this.mc_surveys
//       .filter(b => title == null || title === b.title);
//   }

//   getMCSurvey(id: string): MC_Survey
//   {
   
//     return this.mc_surveys.find(b => b._id === id) as MC_Survey;
//   }

//   getTitles(): string[]
//   {
//     return this.titles;
//   }
// }