import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  survey!: Survey;

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router
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
      },
        error: (e) => console.error(e)
      });
  }
}
