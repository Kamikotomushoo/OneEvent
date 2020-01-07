import { Component, OnInit, ViewChild, AfterContentInit, AfterContentChecked, AfterViewInit } from '@angular/core';
import { OptionsInput, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';

import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { HttpClient } from '@angular/common/http';
import { EventApiService } from 'src/app/services/event-api.service';
import { IEventContext, IEventContextForList } from 'src/app/interfaces/event.interface';
import { MatDialog } from '@angular/material';
import { WholeEventDialogComponent } from '../whole-event-dialog/whole-event-dialog.component';
import { ListOfEventsDialogComponent } from '../list-of-events-dialog/list-of-events-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  options: OptionsInput;
  calEl: HTMLElement = document.getElementById('fullcalendar');
  calPI: Calendar;
  eventsModel: Array<{
    id: number
    title: string,
    start: Date,
    end?: Date
    }> = [];

  @ViewChild('fullcalendar', {static: false}) fullcalendar: FullCalendarComponent;

  constructor(private service: EventApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.options = {
      header: {
        left: 'prev,today',
        center: 'title',
        right: 'today,next'
      },
      selectable: true,
      plugins: [dayGridPlugin, interactionPlugin]
    };

    this.service.getAllHeaders().subscribe(resposneData => {
      var rs = resposneData as any[];
      for(var i = 0; i < rs.length; i++ ){
        let stDate: Date =  new Date(rs[i].startTime + 'Z');
        let endDate: Date =  new Date(rs[i].endTime + 'Z');

          this.eventsModel = this.eventsModel.concat([
            {
              id: rs[i].id,
              title: rs[i].name,
              start: stDate,
              end: endDate
            }
          ]);
      }
    });

    this.service.newEventAdded.subscribe(() => {
      this.service.getAllHeaders().subscribe(resposneData => {
        const rs = resposneData as any[];
        const stDate: Date =  new Date(rs[rs.length - 1].startTime + 'Z');
        let endDate: Date =  new Date(rs[rs.length - 1].endTime + 'Z');
        if (endDate <= stDate) {
          endDate = stDate;
        }

        this.eventsModel = this.eventsModel.concat([
          {
            id: rs[rs.length - 1].id,
            title: rs[rs.length - 1].name,
            start: stDate,
            end: endDate
          }
        ]);

      });
    });

    this.service.deleteEventEmitter.subscribe(model => {
      this.Delete(model);
    });

  }


  DateClick(info) {

    const selectDate = new Date(info.startStr);
    const filtered = this.eventsModel.filter((value, index, arr) => {

      const curStDate = new Date(value.start);
      const curEndDate = new Date(value.end);

      return (
        (curStDate.getFullYear() === selectDate.getFullYear() &&
          curStDate.getMonth() === selectDate.getMonth() &&
          curStDate.getDate() === selectDate.getDate())
      ||
        ((curStDate.getFullYear() <= selectDate.getFullYear() && selectDate.getFullYear() <= curEndDate.getFullYear()) &&
        (curStDate.getMonth() <= selectDate.getMonth() && selectDate.getMonth() <= curEndDate.getMonth())  &&
        (curStDate.getDate() <= selectDate.getDate() && selectDate.getDate() <= curEndDate.getDate()))
      );

    });

    const eventForDay: Array<IEventContext> = [];
    for ( const event of filtered ) {
      eventForDay.push({
        id: event.id,
        name: event.title,
        startTime: event.start,
        endTime: event.end
      });
    }
    console.log(eventForDay);

    const contextForDialog: IEventContextForList = {
      eventList: eventForDay,
      currentDay: selectDate
    };

    const dialogRef = this.dialog.open(ListOfEventsDialogComponent, {
      width: '500px',
      data: contextForDialog
    });

  }

  eventClick(model) {

    this.service.getDetailsById((+model.event.id)).subscribe(resp => {
      const rs = resp as {id: number , description: string};
      const context: IEventContext = {
                                    id: +model.event.id,
                                    startTime: model.event.start,
                                    endTime: model.event.end,
                                    description: rs.description,
                                    name: model.event.title
                                   };
      const dialogRef = this.dialog.open(WholeEventDialogComponent, {
              width: '400px',
              data: context
            });
    });

  }

  deleteEvent(model) {
    this.Delete(+model.event.id);
  }

  private Delete(IdForDelete: number){
    this.service.deleteEventById((IdForDelete)).subscribe(() => {
      const filtered =  this.eventsModel.filter((value) => {

        return value.id !== IdForDelete ;
      });

      this.eventsModel = filtered;
    },
    error => {
      alert(error.message);
    });
  }

}
