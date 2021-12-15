import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PartialsModule } from '../../partials/partials.module';
import { LoginComponent } from "./login.component";
import { RegisterComponent } from "./register.component";
import { AuthService } from "../../services/auth.service"


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PartialsModule
  ],
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent, RegisterComponent],
  providers: [AuthService]
})
export class AuthModule {}
