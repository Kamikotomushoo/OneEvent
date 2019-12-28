import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient  } from '@angular/common/http';
// import { IWeatherContext} from '../interfaces/weather-context';
import { environment } from '../../environments/environment';
import { IEventContext } from '../interfaces/event.interface';
import { FormGroup } from '@angular/forms';

@Injectable()
export class EventApiService {

  cityInHeader = new Subject<string>();
  // weatherResponse = new Subject<IWeatherContext>();

  constructor(private http: HttpClient) {}

  // insertNewEvent(event: IEventContext) {
  //   try {
  //     var returnObserveble = this.http.post(environment.apiUrl + '/events' , event );
  //     return returnObserveble;
  //   } catch {
  //     return null;
  //   }
  // }
  // insertNewEvent(name: string , description: string, stDate: Date, stTime: any, endDate: Date, endTime: any) {
  //   try {

  //     if ( endDate !== null) {

  //       endTime = endTime.split(':');
  //       endDate.setHours(+endTime[0]);
  //       endDate.setMinutes(+endTime[1]);

  //     } else {
  //       endDate = stDate;
  //     }

  //     let event: IEventContext = {name: name,
  //       description: description,
  //       startTime: stDate,
  //       endTime: endDate };

  //     var returnObserveble = this.http.post(environment.apiUrl + '/events' , event );
  //     return returnObserveble;
  //   } catch {
  //     return null;
  //   }
  // }

  insertNewEvent(eventForm: FormGroup ) {
    try {

      let eventName = eventForm.get('nameEvent').value;
      let description = eventForm.get('descritionField').value;

      let startDate = new Date(eventForm.get('startDateField').value);
      let startTime = eventForm.get('startTimeField').value;
      startTime = startTime.split(':');
      startDate.setHours(+startTime[0]);
      startDate.setMinutes(+startTime[1]);

      let endDate = eventForm.get('endDateField').value;
      let endTime = eventForm.get('endTimeField').value;
      let event: IEventContext;
      if ( endDate !== null) {

        endTime = endTime.split(':');
        endDate.setHours(+endTime[0]);
        endDate.setMinutes(+endTime[1]);
        event  = {name: eventName,
          description: description,
          startTime: startDate,
          endTime: endDate };

      } else {
        event  = {name: eventName,
          description: description,
          startTime: startDate };
      }


      var returnObserveble = this.http.post(environment.apiUrl + '/events' , event );
      return returnObserveble;

    } catch {
      return null;
    }
  }
}
