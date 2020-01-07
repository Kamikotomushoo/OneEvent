import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IEventContext } from 'src/app/interfaces/event.interface';
import { EventApiService } from 'src/app/services/event-api.service';

@Component({
  selector: 'app-whole-event-dialog',
  templateUrl: './whole-event-dialog.component.html',
  styleUrls: ['./whole-event-dialog.component.scss']
})
export class WholeEventDialogComponent implements OnInit {

  startDate: string;
  startTime: string;

  endDate: string;
  endTime: string;



  constructor(
    public dialogRef: MatDialogRef<WholeEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEventContext,
            private service: EventApiService) {}


    ngOnInit() {
      this.startDate = new Date(this.data.startTime).toDateString();
      this.startTime = new Date(this.data.startTime).toLocaleTimeString()

      if ( this.data.endTime > this.data.startTime) {
        this.endDate = new Date(this.data.endTime).toDateString();
        this.endTime = new Date(this.data.endTime).toLocaleTimeString();
      }


    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onDeleteClick(): void {
      this.service.deleteEventEmitter.next(this.data.id);
      this.onNoClick();
    }

}
