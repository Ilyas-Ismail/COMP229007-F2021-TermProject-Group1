import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { Validators, FormGroup, FormBuilder, FormControl } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  data: any = {
    username: '',
    password: ''
  }
  public message: string | undefined;
  constructor(
    private router: Router,
    private auth: AuthService) { }

  login() {
    console.log(this.data);
    this.auth.login(this.data)
      .subscribe(res => {
        console.log(res);
        if (res) {
          this.router.navigateByUrl(this.auth.redirectUrl || "");
          console.log(this.auth);
        }
        this.message = "Authentication Failed";
      });
  }

}
