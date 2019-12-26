import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {  NgxMaterialTimepickerTheme} from 'ngx-material-timepicker';
import { NameLimit, DescriptionLimit } from '../../../validators/CustomValidators';


@Component({
  selector: 'app-input-event',
  templateUrl: './input-event.component.html',
  styleUrls: ['./input-event.component.scss']
})
export class InputEventComponent implements OnInit {

  eventForm: FormGroup;

  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
        bodyBackgroundColor: '#424242',
        buttonColor: '#fff'
    },
    dial: {
        dialBackgroundColor: '#44549c',
    },
    clockFace: {
        clockFaceBackgroundColor: '#555',
        clockHandColor: '#bfb9a4',
        clockFaceTimeInactiveColor: '#fff'
    }
  };
  minDate = new Date();

  constructor() { }

  ngOnInit() {
    this.eventForm = new FormGroup({
      'inputField': new FormGroup({
        'nameEvent': new FormControl(null, [Validators.required]),
        'descritionField': new FormControl(null,[]),
        'startDateTimeGroup': new FormGroup({
          'startDateField': new FormControl(new Date(),[Validators.required]),
          'startTimeField': new FormControl(null,[Validators.required])
        }),
        'endDateTimeGroup': new FormGroup({
          'endDateField': new FormControl(null),
          'endTimeField': new FormControl(null)
        })
      }),
    });
  }

  OnSubmit(){
    let myDate = new Date(this.eventForm.get('inputField.startDateTimeGroup.startDateField').value);
    console.log(this.eventForm.get('inputField.startDateTimeGroup.startDateField').value);
    var myTime = this.eventForm.get('inputField.startDateTimeGroup.startTimeField').value;
    myTime = myTime.split(':');
    myDate.setHours(+myTime[0]);
    myDate.setMinutes(+myTime[1]);
    console.log(myDate);
    console.log(this.eventForm.get('inputField.endDateTimeGroup.endTimeField').value)

    //this.loginForm.reset();
  }

}
