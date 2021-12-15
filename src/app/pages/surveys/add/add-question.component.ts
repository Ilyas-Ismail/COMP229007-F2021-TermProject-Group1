import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from "@angular/forms";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  data: any = {
    id: '',
    title: '',
  }
  addQuestionForm: FormGroup;

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.addQuestionForm = this.formBuilder.group({
      id: [''],
      title: [''],
      question: [''],
      choices: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.getSurvey(this.route.snapshot.params["id"]);
    this.addChoice();
  }

  getSurvey(id: string): void {
    this.surveyService.get(id)
      .subscribe({
        next: (data) => {
          this.data.id = data._id;
          this.data.title = data.Title;
          this.addQuestionForm.patchValue(this.data);
          console.log(this.addQuestionForm.value);
      },
        error: (e) => console.error(e)
      });
  }

  addChoice(): void{
    if (this.choices.length < 10) {
      this.choices.push(new FormControl(''));
    }
  }

  removeChoice(i:number): void{
    this.choices.removeAt(i);
  }

  reset(): void {
    while(this.choices.length > 1){
      this.removeChoice(0);
    }
    this.addQuestionForm.reset({
      id: this.data.id,
      title: this.data.title
    });
  }

  nextQuestion(): void{
    this.saveQuestion();
    this.reset();
  }

  review(): void{
    this.saveQuestion();
    this.router.navigate([`surveys/edit/view/${this.data.id}`]);
  }

  saveQuestion(): void{
    this.addQuestionForm.value.choices = this.addQuestionForm.value.choices.filter((x: string) => x != "");
    console.log(this.addQuestionForm.value);

    this.surveyService.create(this.addQuestionForm.value, 'add/question')
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
  }

  get choices(): FormArray{
    return this.addQuestionForm.get("choices") as FormArray;
  }

}
