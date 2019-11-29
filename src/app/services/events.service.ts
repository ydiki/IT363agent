import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Event {
  id?: string;
  title:string;
  createdAt: number;
}


@Injectable({
  providedIn: 'root'
})
export class EventService {private eventsCollection: AngularFirestoreCollection<Event>;
 
  private events: Observable<Event[]>;
 
  constructor(db: AngularFirestore) {
    this.eventsCollection = db.collection<Event>('events');
 
    this.events = this.eventsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getEvents() {
    return this.events;
  }
 
  getEvent(id) {
    return this.eventsCollection.doc<Event>(id).valueChanges();
  }
 
  updateEvent(Event: Event, id: string) {
    return this.eventsCollection.doc(id).update(Event);
  }
 
  addEvent(Event: Event) {
    return this.eventsCollection.add(Event);
  }
 
  removeEvent(id) {
    return this.eventsCollection.doc(id).delete();
  }
}
