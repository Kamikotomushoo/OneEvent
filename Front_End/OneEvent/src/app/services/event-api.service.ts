import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient  } from '@angular/common/http';
// import { IWeatherContext} from '../interfaces/weather-context';
import { environment } from '../../environments/environment';
import { IEventContext } from '../interfaces/event.interface';

@Injectable()
export class EventApiService {

  cityInHeader = new Subject<string>();
  // weatherResponse = new Subject<IWeatherContext>();

  constructor(private http: HttpClient) {}

  insertNewEvent(event: IEventContext) {
    try {
      var returnObserveble = this.http.post(environment.apiUrl + '/events' , event );
      return returnObserveble;
    } catch {
      return null;
    }
  }
}
