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

  startDate: Date;
  startDay: number;
  startMonth: number;
  startYear: number;
  startHours: string;
  startMinutes: string;

  endDate: Date;
  endDay: number;
  endMonth: number;
  endYear: number;
  endHours: string;
  endMinutes: string;



  constructor(
    public dialogRef: MatDialogRef<WholeEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEventContext,
     private service: EventApiService) {}


    ngOnInit() {
      this.startDate = this.data.startTime;
      this.startDay = new Date(this.startDate).getDate();
      this.startMonth = new Date(this.startDate).getMonth() + 1;
      this.startYear = new Date(this.startDate).getFullYear();

      var stHours = new Date(this.startDate).getHours();
      var startMinutes = new Date(this.startDate).getMinutes();

      this.startHours = stHours < 10 ? '0' + stHours : stHours.toString();
      this.startMinutes = startMinutes < 10 ? '0' + startMinutes : startMinutes.toString();

      this.endDate = this.data.endTime;
      this.endDay = new Date(this.endDate).getDate();
      this.endMonth = new Date(this.endDate).getMonth() + 1;
      this.endYear = new Date(this.endDate).getFullYear();

      var endHours = new Date(this.endDate).getHours();
      var endMinutes = new Date(this.endDate).getMinutes();

      this.endHours = endHours < 10 ? '0' + endHours : endHours.toString();
      this.endMinutes = endMinutes < 10 ? '0' + endMinutes : endMinutes.toString();

    }
    onNoClick(): void {
      this.dialogRef.close();
    }

    onDeleteClick(): void {
      this.service.deleteEventEmitter.next(this.data.model);
      this.onNoClick();
    }

}
