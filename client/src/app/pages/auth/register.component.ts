import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { Validators, FormGroup, FormBuilder, FormControl } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  errorMessage: string | undefined = '';
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { 
    this.registerForm = this.formBuilder.group({
      username: [''],
      password: [''],
      confirm: [''],
      email: [''],
      displayName: ['']
    });
  }


  onSubmit(): void{
    console.log(this.registerForm.value);
    if(this.password === this.confirm) {
      this.authService.create(this.registerForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.success) {
              alert(res.message);
              this.router.navigateByUrl("/login");
            }
            this.errorMessage = res.message;
          },
          error: (e) => {
            console.error(e);
          }
        });
    } else {
      this.errorMessage = 'Passwords do not match';
    }
  }

  get password() : string {
    return this.registerForm.value.password;
  }

  get confirm() : string {
    return this.registerForm.value.confirm;
  }

}
