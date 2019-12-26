import { Component, OnChanges, OnInit } from '@angular/core';
import {  NgxMaterialTimepickerTheme} from 'ngx-material-timepicker';
import { DateTime, LocalZone } from 'luxon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements  OnInit {
  title = 'OneEvent';
  
  ngOnInit() {

  }


}
