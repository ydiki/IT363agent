import { Component, OnInit } from '@angular/core';
import {Event, EventService} from '../../services/events.service'

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.page.html',
  styleUrls: ['./events-list.page.scss'],
})
export class EventsListPage implements OnInit {


  //events;
  events;
  userId:string;
  ref;
  constructor(private eventService:EventService) {
    console.log("start");
    var self =this;
    this.eventService.refreshEvents().then(res => {
      this.events = res;
      console.log("res",res)});
    console.log("events",this.eventService.getEvents()); 
  }
  ngOnInit() {
  
  }
 
  remove(item) {
    this.eventService.removeEvent(item.id);
    this.eventService.refreshEvents().then(res => {
      this.events = res;
      console.log("res",res)});
    
  }

}
