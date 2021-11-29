import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from "@angular/forms";
import { SurveyRepository } from 'src/app/models/survey.repository';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  
  survey: Survey = new Survey();

  constructor(
    private surveyService: SurveyService,
    activeRoute: ActivatedRoute,
    private router: Router,
    private repository:SurveyRepository
    // private formBuilder: FormBuilder
  ) { 
      this.repository.getSurvey(activeRoute.snapshot.params["id"]);
    // this.addQuestionForm = this.formBuilder.group({
    //   id: [''],
    //   title: [''],
    //   question: [''],
    //   choices: this.formBuilder.array([])
    // });
  }

  // ngOnInit(): void {
   
  //   this.addChoice();
  // }

  // getSurvey(id: string): void {
  //   this.surveyService.get(id)
  //     .subscribe({
  //       next: (data) => {
  //         this.data.id = data._id;
  //         this.data.title = data.Title;
  //         this.addQuestionForm.patchValue(this.data);
  //         console.log(this.addQuestionForm.value);
  //     },
  //       error: (e) => console.error(e)
  //     });
  // }

  // addChoice(): void{
  //   if (this.choices.length < 10) {
  //     this.choices.push(new FormControl(''));
  //   }
  // }

  // removeChoice(i:number): void{
  //   this.choices.removeAt(i);
  // }

  // reset(): void {
  //   while(this.choices.length > 1){
  //     this.removeChoice(0);
  //   }
  //   this.addQuestionForm.reset({
  //     id: this.data.id,
  //     title: this.data.title
  //   });
  // }

  // nextQuestion(): void{
  //   this.saveQuestion();
  //   this.reset();
  // }

  // review(): void{
  //   this.saveQuestion();
  //   this.router.navigate([`surveys/edit/view/${this.data.id}`]);
  // }

  // saveQuestion(): void{
  //   this.addQuestionForm.value.choices = this.addQuestionForm.value.choices.filter((x: string) => x != "");
  //   console.log(this.addQuestionForm.value);

  //   this.surveyService.create(this.addQuestionForm.value, 'add/question')
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

  // get choices(): FormArray{
  //   return this.addQuestionForm.get("choices") as FormArray;
  // }

}
