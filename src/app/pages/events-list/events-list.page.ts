import { Component, OnInit } from '@angular/core';
import {Event, EventService} from '../../services/events.service'

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.page.html',
  styleUrls: ['./events-list.page.scss'],
})
export class EventsListPage implements OnInit {


  events;
  constructor(private eventService:EventService) {
  }
  ngOnInit() {
    console.log("start");
    this.events = this.eventService.getEvents();
   console.log("events",this.events); 
  }
 
  remove(item) {
    this.eventService.removeEvent(item.id);
  }

}
