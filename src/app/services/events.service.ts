import { Injectable } from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

export interface Event {
  id?: string;
  title:string;
  createdAt: number;
}


@Injectable({
  providedIn: 'root'
})
export class EventService {
  
  private events;
  
  ref = firebase.database().ref('reminders');
  constructor() {
    console.log("events Service starts")

    this.ref.on('value', resp => {
      this.events = [];
      this.events = this.snapshotToArray(resp);
    });
    // this.eventsCollection = db.collection<Event>('events');
 
    }

  refreshEvents() {
   
    this.ref.on('value', resp => {
      this.events = [];
      this.events = this.snapshotToArray(resp);
    });
    return this.events;
  }
 
  getEvents() {
    return this.events;
  }
 
  getEvent(id) {
    return this.events[id];
  }
 
  updateEvent(Event: Event, id: string) {
    return this.ref.push().set({reminder:"updated"});
    // return this.eventsCollection.doc(id).update(Event);
  }
 
  addEvent(Event: Event) {
    return this.ref.push().set({reminder:"updated"})
    // return this.eventsCollection.add(Event);
  }
 
  removeEvent(id) {
    // return this.eventsCollection.doc(id).delete();
  }


  snapshotToArray = snapshot => {
    let returnArr = [];
    console.log("snapshot",snapshot);
    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        console.log("item",item);
        returnArr.push(item);
    });

    return returnArr;
};
}
