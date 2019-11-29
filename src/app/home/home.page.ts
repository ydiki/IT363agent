import { Component } from '@angular/core';
import {Event, EventService} from '../services/events.service'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  events:Event[];
  constructor(private eventService:EventService) {
  }
  ngOnInit() {
    this.eventService.getEvents().subscribe(res => {
      this.events = res;
    });
  }
 
  remove(item) {
    this.eventService.removeEvent(item.id);
  }
}
