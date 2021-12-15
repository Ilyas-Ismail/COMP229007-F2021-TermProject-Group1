import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css']
})
export class EditSurveyComponent implements OnInit {

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

  deleteQuestion(event: any): void{
    if(!confirm('Are you sure?'))
      return;
    this.survey.Questions!.splice(event.target.value, 1);
    this.survey.Choices!.splice(event.target.value, 1);
    const data = {
      id: this.survey._id,
      questions: this.survey.Questions,
      choices: this.survey.Choices
    }
    console.log(data);
    this.surveyService.update(data, 'edit/delete')
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getSurvey(this.survey._id);
        },
        error: (e) => console.error(e)
      });
  }

}
