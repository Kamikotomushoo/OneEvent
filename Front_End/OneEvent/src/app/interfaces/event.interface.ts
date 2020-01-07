export interface IEventContext {
  id?: number;
  name?: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
}


export interface IEventContextForList {
  eventList?: Array<IEventContext>;
  currentDay?: Date;
}
