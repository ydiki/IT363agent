import { Component, OnInit } from '@angular/core';
import {Event, EventService} from '../../services/events.service';
import {ActivatedRoute} from '@angular/router'
import { NavController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  event;
  eventId = null;
  constructor(private route: ActivatedRoute, private nav: NavController, 
    private eventService: EventService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['id'];
    if (this.eventId)  {
      console.log("this.eventId",this.eventId);
      this.loadEvent();
    }
  }
     
  async loadEvent() {
    const loading = await this.loadingController.create({
      message: 'Loading event..'
    });
    await loading.present();
    
    this.eventService.getEvent(this.eventId).then(res => {
     // this.event = res;
      console.log(this.event);
      loading.dismiss();
    });
  }
 
  async saveEvent() {
 
    const loading = await this.loadingController.create({
      message: 'Saving event..'
    });
    await loading.present();
 
    if (this.eventId) {
      this.eventService.updateEvent( this.eventId,"test").then(() => {
        loading.dismiss();
        this.nav.navigateBack('sidebar/events-list');
      });
    } else {
      this.eventService.addEvent(this.eventId,"test").then(() => {
        loading.dismiss();
        this.nav.navigateBack('sidebar/events-list');
      });
    }
  }

  }

