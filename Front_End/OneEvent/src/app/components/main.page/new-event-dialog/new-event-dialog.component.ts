import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IEventContext } from 'src/app/interfaces/event.interface';

@Component({
  selector: 'app-new-event-dialog',
  templateUrl: './new-event-dialog.component.html',
  styleUrls: ['./new-event-dialog.component.scss']
})
export class NewEventDialogComponent implements OnInit {

  startDate: Date;
  startDay: number;
  startMonth: number;
  startYear: number;
  startHours: number;
  startMinutes: number;

  endDate: Date;
  endDay: number;
  endMonth: number;
  endYear: number;
  endHours: number;
  endMinutes: number;

  constructor(
    public dialogRef: MatDialogRef<NewEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEventContext) {}

  ngOnInit() {
    this.startDate = this.data.startTime;
    this.startDay = new Date(this.startDate).getDate();
    this.startMonth = new Date(this.startDate).getMonth() + 1;
    this.startYear = new Date(this.startDate).getFullYear();
    this.startHours = new Date(this.startDate).getHours();
    this.startMinutes = new Date(this.startDate).getMinutes();

    this.endDate = this.data.endTime;
    this.endDay = new Date(this.endDate).getDate();
    this.endMonth = new Date(this.endDate).getMonth() + 1;
    this.endYear = new Date(this.endDate).getFullYear();
    this.endHours = new Date(this.endDate).getHours();
    this.endMinutes = new Date(this.endDate).getMinutes();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
