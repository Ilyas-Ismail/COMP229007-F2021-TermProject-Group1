import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!confirm('Do you really want to delete this survey?')){
      this.router.navigate(['surveys/list']);
      return;
    }
    this.deleteSurvey(this.route.snapshot.params["id"]);
  }

  deleteSurvey(id: any): void{
    this.surveyService.delete(id, `delete/${id}`)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['surveys/list']);
        },
        error: (e) => console.error(e)
      });
  }

}
