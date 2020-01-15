import { Injectable } from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {StorageServiceService}  from '../services/storage-service.service';
import * as firebase from 'firebase';

export interface Event {
  id?: string;
  title:string;
  startTime: string;
  message:string;
  eventId:string;
}


@Injectable({
  providedIn: 'root'
})
export class EventService {

  events:any[];
  userId:string;
  ref;
  constructor( private storageAuth:StorageServiceService) {
    console.log("events Service starts")
    this.userId = this.storageAuth.getId();
    this.ref = firebase.database().ref(`users/${this.userId}/reminders`);
    console.log(`users/${this.userId}/reminders`);
    this.ref.on('value', resp => {
      this.events = [];
      this.events = this.snapshotToArray(resp);
      console.log(this.events);
    });
    }

  initRef(){
    this.userId = this.storageAuth.getId();
    this.ref = firebase.database().ref(`users/${this.userId}/reminders`);
    console.log(`users/${this.userId}/reminders`);
    this.ref.on('value', resp => {
      this.events = [];
      this.events = this.snapshotToArray(resp);
      console.log(this.events);
    });
  }

  refreshEvents() {

    return new Promise((resolve,reject)=>{this.ref.on('value', resp => {
      this.events = [];
      console.log(resp);
      this.events = this.snapshotToArray(resp);
      console.log("events",this.events);
    resolve(this.events);
    });
  })
  }

  getEvents() {
    return this.events;
  }

  getEvent(id) {
    return new Promise((resolve,reject)=>{
    firebase.database().ref(`users/${this.userId}/reminders/${id}`).on('value', resp => {
      console.log(resp.val());
      
      resolve(resp.val())
    });
  })}
 
  updateEvent( id: string,eventId:string) {
    return firebase.database().ref(`users/${this.userId}/reminders/${id}`).set({eventId:eventId});
  }

  addEvent(id:string,date:string) {
    return this.ref.push({eventId:id,startTime:date})
  }

  removeEvent(id) {
   return  firebase.database().ref(`users/${this.userId}/reminders/${id}`).remove();
  }


  snapshotToArray = snapshot => {
    let returnArr = [];
    //console.log("snapshot",snapshot);
    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        let id = childSnapshot.key;
        const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
        const date = new Date(item.startTime);
<<<<<<<
        let string =  String(date.getDate()) + " of " + monthNames[date.getMonth()] + " at " + (date.getHours() > 9 ? '' : '0') + date.getHours() + ":" + (date.getMinutes() > 9 ? '' : '0') + date.getMinutes();
        //console.log(":new Date(item.stratTime)",string);
        let reminder = {id,eventId:item.eventId,startTime:string}
        //console.log("reminder",reminder);
        returnArr.push(reminder);
=======
        let string = String(date.getDate()) + " of " + monthNames[date.getMonth()] + " at " + date.getHours() + ":" + date.getMinutes();
        console.log(":new Date(item.stratTime)",string);
     //   let reminder = {id,eventId:item.eventId,startTime:string}
      let reminder = item;
      reminder['id'] = id;  
      reminder['startTime'] = string; 
     console.log("reminder",reminder);
        returnArr.push({id,reminder});
>>>>>>>
    });

    return returnArr;
};
}
