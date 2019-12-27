import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatNativeDateModule,
  MatFormFieldModule,
  MatDialogModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputEventComponent } from './components/main.page/input-event/input-event.component';
import { MainResponseComponent } from './components/main.page/main-response.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { EventApiService } from './services/event-api.service';
import { NewEventDialogComponent } from './components/main.page/new-event-dialog/new-event-dialog.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InputEventComponent,
    MainResponseComponent,
    NewEventDialogComponent
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
    HttpClientModule,
    MatDialogModule
  ],
  entryComponents: [
    NewEventDialogComponent
  ],
  providers: [EventApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
