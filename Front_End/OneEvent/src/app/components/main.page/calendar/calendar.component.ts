import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';

// import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { HttpClient } from '@angular/common/http';
import { EventApiService } from 'src/app/services/event-api.service';
import { IEventContext } from 'src/app/interfaces/event.interface';
import { MatDialog } from '@angular/material';
import { WholeEventDialogComponent } from '../whole-event-dialog/whole-event-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterContentInit {
  options: OptionsInput;
  eventsModel: {
    id: number
    title: string,
    start: Date,
    end?: Date
    }[] = [
      // {
      //   id: 45,
      //   title:' rs[i].name',
      //   start: new Date('2020-01-05'),
      //   end: new Date('2020-01-10')
      // }
    ];
  @ViewChild('fullcalendar', {static: false}) fullcalendar: FullCalendarComponent;

  constructor(private service: EventApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.options = {
      editable: true,
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'today'
      },
      plugins: [dayGridPlugin]
      // plugins: [listPlugin]
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

    this.service.newEventAdded.subscribe(()=>{
      this.service.getAllHeaders().subscribe(resposneData => {
        var rs = resposneData as any[];
        let stDate: Date =  new Date(rs[rs.length - 1].startTime + 'Z');
        let endDate: Date =  new Date(rs[rs.length - 1].endTime + 'Z');
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
      this.deleteEvent(model);
    });


  }
  ngAfterContentInit(){
    // console.log(this.fullcalendar.);
  }
  eventClick(model) {

    this.service.getDetailsById((+model.event.id)).subscribe(resp => {
      let rs = resp as {id: number , description: string};
      let context: IEventContext = {
                                    startTime: model.event.start,
                                    endTime: model.event.end,
                                    description: rs.description,
                                    name: model.event.title,
                                    model: model
                                   };
      const dialogRef = this.dialog.open(WholeEventDialogComponent, {
              width: '400px',
              data: context
            });
    });


  }

  deleteEvent(model){
    this.service.deleteEventById((+model.event.id)).subscribe(resp => {
      var filtered =  this.eventsModel.filter(function(value, index, arr) {

        return value.id !== +model.event.id ;
      });
      console.log(filtered);

      this.eventsModel = filtered;
    },
    error => {
      alert(error.message);
    });
  }

  // updateHeader() {
  //   this.options.header = {
  //     left: 'prev,next myCustomButton',
  //     center: 'title',
  //     right: '',
  //   };
  // }
  // updateEvents() {
  //   this.eventsModel = this.eventsModel.concat([
  //     {
  //       id: 10,
  //       title: 'Updaten Event',
  //       start: new Date()
  //     }
  //   ]);


  // }
  // get yearMonth(): string {
  //   const dateObj = new Date();
  //   return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  // }
}
