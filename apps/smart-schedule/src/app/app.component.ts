import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { SchedulesFacade } from './+state/schedules.facade';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [RouterModule, FullCalendarModule, AsyncPipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'smart-schedule';
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
  };
  events$;

  constructor(private schedulesFacade: SchedulesFacade) {
    this.events$ = this.schedulesFacade.events$;
  }



  ngOnInit() {
    this.schedulesFacade.load();
  }
}
