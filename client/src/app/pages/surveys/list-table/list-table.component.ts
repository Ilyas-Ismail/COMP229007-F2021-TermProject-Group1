import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.css']
})
export class ListTableComponent implements OnInit {

  surveys?: Survey[];

  constructor(
    private surveyService: SurveyService,
  ) { }

  ngOnInit(): void {
    this.getSurveys();
  }

  getSurveys(): void {
    this.surveyService.getAll()
      .subscribe({
        next: (data) => {
          this.surveys = data;
          console.log(this.surveys);
        },
        error: (e) => console.error(e)
      });
  }

}
