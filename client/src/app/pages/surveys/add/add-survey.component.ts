import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css']
})
export class AddSurveyComponent implements OnInit {
  survey: Survey = {
    Title: '',
    Username: this.auth.username,
    Time: 0
  };
  constructor(
    private auth: AuthService,
    private surveyService: SurveyService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  saveSurvey(): void{
    const data = {
      Title: this.survey.Title,
      Username: this.survey.Username,
      Time: this.survey.Time
    };

    this.surveyService.create(data, 'add')
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate([`surveys/new/question/${res._id}`]);
        },
        error: (e) => console.error(e)
      });
  }
}
