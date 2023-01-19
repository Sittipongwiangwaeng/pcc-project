import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { SumaryComponent } from './sumary/sumary.component';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
    declarations: [
        AppComponent,
        InputComponent,
        SumaryComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        InputNumberModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
