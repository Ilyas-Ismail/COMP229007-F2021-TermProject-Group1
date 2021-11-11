import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [
        FooterComponent,
        HeaderComponent
    ],
    exports: [
        FooterComponent,
        HeaderComponent
    ]
})
export class PartialsModule { }
