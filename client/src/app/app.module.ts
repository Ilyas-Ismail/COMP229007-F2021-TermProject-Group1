import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AuthGuard } from "./pages/auth/auth.guard";
import { AuthModule } from "./pages/auth/auth.module";
import { PartialsModule } from './partials/partials.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    PartialsModule,
    PagesModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AuthModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
