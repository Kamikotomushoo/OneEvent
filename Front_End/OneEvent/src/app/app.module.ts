import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {
  MatNativeDateModule,
  MatFormFieldModule} from '@angular/material';
import { InputEventComponent } from './components/main.page/input-event/input-event.component';
import { MainResponseComponent } from './components/main.page/main-response.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
// import { ngMaterialDatePicker} from 'ng-material-datetimepicker';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InputEventComponent,
    MainResponseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    // ngMaterialDatePicker
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
