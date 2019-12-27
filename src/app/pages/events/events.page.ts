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
  event : Event = {
    title : 'test',
    createdAt: new Date().getTime(),
    };

  eventId = null;
  constructor(private route: ActivatedRoute, private nav: NavController, 
    private eventService: EventService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['id'];
    if (this.eventId)  {
      this.loadEvent();
    }
  }
     
  async loadEvent() {
    const loading = await this.loadingController.create({
      message: 'Loading event..'
    });
    await loading.present();
 
    this.eventService.getEvent(this.eventId).subscribe(res => {
      loading.dismiss();
      this.event = res;
    });
  }
 
  async saveEvent() {
 
    const loading = await this.loadingController.create({
      message: 'Saving event..'
    });
    await loading.present();
 
    if (this.eventId) {
      this.eventService.updateEvent(this.event, this.eventId).then(() => {
        loading.dismiss();
        this.nav.navigateBack('home');
      });
    } else {
      this.eventService.addEvent(this.event).then(() => {
        loading.dismiss();
        this.nav.navigateBack('home');
      });
    }
  }

  }

