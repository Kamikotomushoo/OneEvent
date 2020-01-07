import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IEventContext } from 'src/app/interfaces/event.interface';

@Component({
  selector: 'app-new-event-dialog',
  templateUrl: './new-event-dialog.component.html',
  styleUrls: ['./new-event-dialog.component.scss']
})
export class NewEventDialogComponent implements OnInit {

  startDate: string;
  startTime: string;

  endDate: string;
  endTime: string;


  constructor(
    public dialogRef: MatDialogRef<NewEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEventContext) {}

  ngOnInit() {
    this.startDate = new Date(this.data.startTime).toDateString();
    this.startTime = new Date(this.data.startTime).toLocaleTimeString();

      if ( this.data.endTime > this.data.startTime) {
        this.endDate = new Date(this.data.endTime).toDateString();
        this.endTime = new Date(this.data.endTime).toLocaleTimeString();
      }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
