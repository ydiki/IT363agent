import { Component, OnInit } from '@angular/core';
import {Event, EventService} from '../../services/events.service'

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.page.html',
  styleUrls: ['./events-list.page.scss'],
})
export class EventsListPage implements OnInit {


  events:Event[];
  constructor(private eventService:EventService) {
  }
  ngOnInit() {
    console.log("start");
    this.eventService.refreshEvents().subscribe(res => {
      console.log(res);
      this.events = res;
    });
  }
 
  remove(item) {
    this.eventService.removeEvent(item.id);
  }

}
