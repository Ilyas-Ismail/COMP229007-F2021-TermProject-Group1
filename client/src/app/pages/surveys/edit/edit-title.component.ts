import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-title',
  templateUrl: './edit-title.component.html',
  styleUrls: ['./edit-title.component.css']
})
export class EditTitleComponent implements OnInit {
  data: any = {
    id: '',
    title: '',
  }

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
        this.data.id = data._id;
        this.data.title = data.Title;
        console.log(this.data);
      },
        error: (e) => console.error(e)
      });
  }

  save(): void{
    this.surveyService.update(this.data, `edit/title/${this.data.id}`)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate([`surveys/edit/view/${this.data.id}`]);
        },
        error: (e) => console.error(e)
      });
  }

}
