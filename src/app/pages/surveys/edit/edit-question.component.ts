import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from "@angular/forms";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  data: any = {
    id: '',
    title: '',
    question: String,
    choices: []
  }
  editQuestionForm: FormGroup;
  idx: any;

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.editQuestionForm = this.formBuilder.group({
      id: [''],
      title: [''],
      question: [''],
      choices: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.getQuestion(this.route.snapshot.params["id"], this.idx = this.route.snapshot.params["idx"]);
  }

  getQuestion(id: string, idx: number): void {
    this.surveyService.get(id)
      .subscribe({
        next: (data) => {
          this.data.id = data._id;
          this.data.title = data.Title;
          this.data.question = data.Questions![idx];
          this.data.choices = data.Choices![idx];
          console.log(this.data);
          this.initialPatch()
          console.log(this.editQuestionForm.value);
      },
        error: (e) => console.error(e)
      });
  }

  initialPatch(): void{
    while(this.choices.length < this.data.choices.length){
      this.addChoice();
    }
    this.editQuestionForm.patchValue(this.data);
  }

  refresh(): void{

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
    this.editQuestionForm.reset({
      id: this.data.id,
      title: this.data.title
    });
  }

  review(): void{
    this.saveQuestion();
  }

 saveQuestion(): void{
    this.editQuestionForm.value.choices = this.editQuestionForm.value.choices.filter((x: string) => x != "");

    this.surveyService.update(this.editQuestionForm.value, `edit/question/${this.data.id}/${this.idx}`)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate([`surveys/edit/view/${this.data.id}`]);
        },
        error: (e) => console.error(e)
      });
  }

  get choices(): FormArray{
    return this.editQuestionForm.get("choices") as FormArray;
  }

}
