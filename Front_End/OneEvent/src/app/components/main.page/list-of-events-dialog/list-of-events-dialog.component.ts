import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { IEventContext, IEventContextForList } from 'src/app/interfaces/event.interface';
import { EventApiService } from 'src/app/services/event-api.service';
import { WholeEventDialogComponent } from '../whole-event-dialog/whole-event-dialog.component';

@Component({
  selector: 'app-list-of-events-dialog',
  templateUrl: './list-of-events-dialog.component.html',
  styleUrls: ['./list-of-events-dialog.component.scss']
})
export class ListOfEventsDialogComponent implements OnInit {

  currentDate: string;
  listOfEvents: Array<IEventContext> = [];


  constructor(
    public dialogRef: MatDialogRef<ListOfEventsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEventContextForList,
    private service: EventApiService,
    public dialog: MatDialog) {}

  ngOnInit() {
    const currDay : Date = new Date(this.data.currentDay);
    // alert(currDay.toDateString());
    this.currentDate = currDay.toDateString();

    this.listOfEvents = this.data.eventList;

    this.listOfEvents.sort((a ,b) => {
      return +a.startTime - +b.startTime;
    });

    this.service.deleteEventEmitter.subscribe(deletedId => {

      const filteder = this.listOfEvents.filter((value) => {

        return value.id !== deletedId;
      });

      this.listOfEvents = filteder;
    });

  }

  openEvent(data) {

    console.log(this.listOfEvents.find(x => x.id === data));

    const clickedEvent: IEventContext = this.listOfEvents.find(x => x.id === data);
    this.service.getDetailsById(data).subscribe(resp => {
      const rs = resp as {id: number , description: string};
      clickedEvent.description = rs.description;

      const dialogRef = this.dialog.open(WholeEventDialogComponent, {
        width: '400px',
        data: clickedEvent
      });
    });



  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
