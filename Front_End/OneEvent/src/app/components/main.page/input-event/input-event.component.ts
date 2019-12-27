import { Component, OnInit, AfterContentInit, DoCheck, AfterContentChecked } from "@angular/core";
import { FormGroup, Validators, FormControl, ValidatorFn } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxMaterialTimepickerTheme } from "ngx-material-timepicker";
import {
  // CorrectStartTime
} from "../../../validators/CustomValidators";
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
      startDateField: new FormControl(new Date(), [Validators.required]),
      startTimeField: new FormControl(null, []),
      endDateField: new FormControl(null),
      endTimeField: new FormControl(null)
    });
  }


  ngAfterContentInit(){

    this.eventForm.get('startTimeField').setValidators([Validators.required
      , this.CorrectStartTime.bind(this)]);

    this.eventForm.get('endDateField').setValidators(this.EndDateExist.bind(this));
    this.eventForm.get('endTimeField').setValidators([this.CorrectEndTime.bind(this)]);

  }


  OnSubmit() {
    let eventName = this.eventForm.get('nameEvent').value;
    let description = this.eventForm.get('descritionField').value;
    let startDate = new Date(this.eventForm.get('startDateField').value);
    var startTime = this.eventForm.get('startTimeField').value;
    startTime = startTime.split(':');
    startDate.setHours(+startTime[0]);
    startDate.setMinutes(+startTime[1]);
    var eventCntx: IEventContext;
    let endDate = null;
    if (this.eventForm.get('endDateField').value !== null) {

      endDate = new Date(this.eventForm.get('endDateField').value);
      var endTime = this.eventForm.get('endTimeField').value;
      endTime = endTime.split(':');
      endDate.setHours(+endTime[0]);
      endDate.setMinutes(+endTime[1]);
       eventCntx = {name: eventName,
                    description: description,
                    startTime: startDate,
                    endTime: endDate };

    } else {
       eventCntx  = {name: eventName,
        description: description,
        startTime: startDate };
    }

    this.eventApiService.insertNewEvent(eventCntx).subscribe(responseData  => {
      var rs = responseData as IEventContext;
          // if(rs.endTime < rs.startTime) console.log('min time');
        // console.log(responseData);
        const dialogRef = this.dialog.open(NewEventDialogComponent, {
          width: '350px',
          data: rs
        });

    });

    this.eventForm.reset();
  }


/* прийшлось виносити валідатори сюди, бо коли намагався це зробити в іншому файлі,
  то при заданні валідатора з параметром ( дата початку івенту була параметром ) воно брало лише ту дату,
  яка по дефолту стоїть в інпуті... */
   CorrectStartTime(control: FormControl): {[s: string]: boolean}  {
    const tempDate = new Date();
    const date: Date = this.eventForm.get('startDateField').value;

    if ( control.value !== null ) {
      if ((date.getFullYear() === tempDate.getFullYear()
      && date.getMonth() === tempDate.getMonth()
      && date.getDate() === tempDate.getDate()) ) {
        var myTime = control.value;
        myTime = myTime.split(':');
        if(tempDate.getHours() > +myTime[0] ||
        (tempDate.getHours() === +myTime[0] && tempDate.getMinutes() >= +myTime[1] )) return { 'incorrectTime': true };
      }
    }
    return null;
  }

  EndDateExist(control: FormControl): {[s: string]: boolean}  {
    if (control.value !== null && this.eventForm.get('endTimeField').value === null) {
      console.log(this.eventForm.get('endTimeField').value);
      return { 'endTimeDoesNotExist': true }; }
    return null;
  }


  CorrectEndTime(control: FormControl): {[s: string]: boolean}  {
    this.eventForm.get('endDateField').updateValueAndValidity();
    const startDate: Date = this.eventForm.get('startDateField').value;
    const endDate: Date = this.eventForm.get('endDateField').value;
    if ( endDate !== null) {
      if ((endDate.getFullYear() < startDate.getFullYear()
        || endDate.getMonth() < startDate.getMonth()
        || endDate.getDate() < startDate.getDate()) ) { return { 'incorrectTime': true }; }
    console.log(control.value );
    if ( control.value !== null ) {

      if ((endDate.getFullYear() === startDate.getFullYear()
        && endDate.getMonth() === startDate.getMonth()
        && endDate.getDate() === startDate.getDate()) ) {

      var myTime = control.value;
      var startTime = this.eventForm.get('startTimeField').value;

      myTime = myTime.split(':');
      startTime = startTime.split(':');

        if( (+startTime[0] > +myTime[0])
        || (+startTime[0]  === +myTime[0] && +startTime[1]  > +myTime[1] )) return { 'incorrectTime': true }; }
       } else {
        return { 'incorrectTime': true };
       }
      } else if (endDate === null && control.value !== null){ return { 'incorrectTime': true }; }
    return null;
  }


}
