import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css']
})
export class AddSurveyFormControl extends FormControl {
  // survey: Survey = {
  //   Title: '',
  //   UserID: ''
  // };
  label: string;
  modelProperty: string;
  constructor(label: string, property: string, value: any, validator: any) {
    super(value, validator);
    this.label = label;
    this.modelProperty = property;
  }



    // private surveyService: SurveyService,
    // private router: Router


// ngOnInit(): void {
// }

// saveSurvey(): void{
//   const data = {
//     Title: this.survey.Title,
//     UserID: this.survey.UserID
//   };

//   this.surveyService.create(data, 'add')
//     .subscribe({
//       next: (res) => {
//         console.log(res);
//         this.router.navigate([`surveys/new/question/${res._id}`]);
//       },
//       error: (e) => console.error(e)
//     });
// }
getValidationMessages(){
  let messages: string[] = [];
  if (this.errors) {
    for (let errorName in this.errors) {
      switch (errorName) {
        case "required":
          messages.push(`must enter ${this.label}`);
          break;
        case "pattern":
          messages.push(`the ${this.label} contains illegal characters`);
          break;
      }
    }
  }
  return messages;
}
}



export class AddSurveyFormGroup extends FormGroup {
  constructor() {
    super({
      name: new AddSurveyFormControl("Name", "name", "", Validators.required),
      category: new AddSurveyFormControl("Category", "catgory", "", Validators.compose([Validators.required,
      Validators.pattern("^[A-Za-z ]+$")])),
      price: new AddSurveyFormControl("Price", "price", "",
        Validators.compose([Validators.required,
        Validators.pattern("^[0-9\.]+$")]))
    });
  }

get surveyControls(): AddSurveyFormControl[]{
  return Object.keys(this.controls)
  .map(k => this.controls[k] as AddSurveyFormControl)
}

getValidationMessages(name:string): string[] {
  return (this.controls['name'] as AddSurveyFormControl).getValidationMessages();
}

getFormValidationMessages(): string[]{
let messages: string[] =[];
Object.values(this.controls).forEach(c =>
  messages.push(...(c as AddSurveyFormControl).getValidationMessages()));
  return messages;
}

}