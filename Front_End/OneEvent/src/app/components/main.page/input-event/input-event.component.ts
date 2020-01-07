import { Component, OnInit, AfterContentInit, DoCheck, AfterContentChecked } from "@angular/core";
import { FormGroup, Validators, FormControl, ValidatorFn } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxMaterialTimepickerTheme } from "ngx-material-timepicker";

import { IEventContext } from '../../../interfaces/event.interface';
import { EventApiService } from 'src/app/services/event-api.service';
import { DateTime } from 'luxon';
import { MatDialog } from '@angular/material';
import { NewEventDialogComponent } from '../new-event-dialog/new-event-dialog.component';


@Component({
  selector: "app-input-event",
  templateUrl: "./input-event.component.html",
  styleUrls: ["./input-event.component.scss"]
})
export class InputEventComponent implements OnInit, AfterContentInit{
  eventForm: FormGroup;

  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: "#424242",
      buttonColor: "#fff"
    },
    dial: {
      dialBackgroundColor: "#44549c"
    },
    clockFace: {
      clockFaceBackgroundColor: "#555",
      clockHandColor: "#bfb9a4",
      clockFaceTimeInactiveColor: "#fff"
    }
  };
  minDate = new Date();

  constructor(private eventApiService: EventApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.eventForm = new FormGroup({
      nameEvent: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      descritionField: new FormControl(null, [Validators.maxLength(1024)]),
      startDateField: new FormControl(new Date(), Validators.required),
      startTimeField: new FormControl(null),
      endDateField: new FormControl(null),
      endTimeField: new FormControl(null)
    });
  }


  ngAfterContentInit() {


    this.eventForm.get('startDateField').setValidators([Validators.required,
       this.CorrectStartDate.bind(this) ]);

    this.eventForm.get('startTimeField').setValidators([Validators.required,
       this.CorrectStartTime.bind(this)]);


    this.eventForm.get('endDateField').setValidators(this.EndDateExist.bind(this));
    this.eventForm.get('endTimeField').setValidators([this.CorrectEndTime.bind(this)]);

  }


  OnSubmit() {
        this.eventApiService.insertNewEvent(this.eventForm).subscribe(responseData  => {
          const rs = responseData as IEventContext;
            const dialogRef = this.dialog.open(NewEventDialogComponent, {
              width: '400px',
              data: rs
            });
            this.eventForm.reset();
            this.eventForm = new FormGroup({
              nameEvent: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
              descritionField: new FormControl(null, [Validators.maxLength(1024)]),
              startDateField: new FormControl(new Date(), Validators.required),
              startTimeField: new FormControl(null),
              endDateField: new FormControl(null),
              endTimeField: new FormControl(null)
            });
            this. ngAfterContentInit();
            this.eventApiService.newEventAdded.next();
    });


  }


/* прийшлось виносити валідатори сюди, бо коли намагався це зробити в іншому файлі,
  то при заданні валідатора з параметром ( дата початку івенту була параметром ) воно брало лише ту дату,
  яка по дефолту стоїть в інпуті... */


  CorrectStartDate(control: FormControl): {[s: string]: boolean}  {

    const tempDate = new Date();
    const date: Date = control.value;
    if (date !== null) {
      console.log(date.getFullYear());
      if ((date.getFullYear() === tempDate.getFullYear()
      && date.getMonth() === tempDate.getMonth()
      && date.getDate() === tempDate.getDate()) ||
      this.eventForm.get('startTimeField').invalid ||
      this.eventForm.get('endDateField').value !== null) {
        this.eventForm.get('startTimeField').updateValueAndValidity();
      }
    }
    return null;
  }

   CorrectStartTime(control: FormControl): {[s: string]: boolean}  {
    const tempDate = new Date();
    const date: Date = this.eventForm.get('startDateField').value;

    this.eventForm.get('endDateField').updateValueAndValidity();
    this.eventForm.get('endTimeField').updateValueAndValidity();


    if ( control.value !== null ) {
      if ((date.getFullYear() === tempDate.getFullYear()
      && date.getMonth() === tempDate.getMonth()
      && date.getDate() === tempDate.getDate()) ) {
        let myTime = control.value;
        myTime = myTime.split(':');
        if(tempDate.getHours() > +myTime[0] ||
        (tempDate.getHours() === +myTime[0] && tempDate.getMinutes() >= +myTime[1] )) return { 'incorrectTime': true };
        return null;
      }
      return null;
    }
    return { 'incorrectTime': true };

  }

  EndDateExist(control: FormControl): {[s: string]: boolean}  {
    if (control.value !== null && this.eventForm.get('endTimeField').value === null) {
      console.log(this.eventForm.get('endTimeField').value);
      return { 'endTimeDoesNotExist': true }; }
      else if(control.value !== null && this.eventForm.get('endTimeField').value !== null)
      {
        this.eventForm.get('endTimeField').updateValueAndValidity();

        return null;
      }
  }


  CorrectEndTime(control: FormControl): {[s: string]: boolean}  {


    const startDate: Date = this.eventForm.get('startDateField').value;
    const endDate: Date = this.eventForm.get('endDateField').value;
    if ( endDate !== null && startDate !== null) {
      if ((endDate.getFullYear() < startDate.getFullYear()) ||

        (endDate.getFullYear()  === startDate.getFullYear()
        && endDate.getMonth() < startDate.getMonth()) ||

       (endDate.getFullYear()  === startDate.getFullYear()
       && endDate.getMonth() === startDate.getMonth()
       && endDate.getDate() < startDate.getDate() )) { return { 'incorrectTime': true }; }

      if ( control.value !== null ) {

      if ((endDate.getFullYear() === startDate.getFullYear()
        && endDate.getMonth() === startDate.getMonth()
        && endDate.getDate() === startDate.getDate()) ) {

        let myTime = control.value;
        let startTime = this.eventForm.get('startTimeField').value;

        myTime = myTime.split(':');
        startTime = startTime.split(':');

        if( (+startTime[0] > +myTime[0]) ||
        (+startTime[0]  === +myTime[0] && +startTime[1]  > +myTime[1] )) return { 'incorrectTime': true };
      }
      if(this.eventForm.get('endDateField').invalid)
      this.eventForm.get('endDateField').updateValueAndValidity();
      return null;
       } else {
        return { 'incorrectTime': true };
       }
      } else if (endDate === null && control.value !== null){ return { 'incorrectTime': true }; }
    if(this.eventForm.get('endDateField').invalid)
      this.eventForm.get('endDateField').updateValueAndValidity();
    return null;
  }


}
