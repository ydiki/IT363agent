import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import {EventService} from './events.service';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {

  reminders = []

  constructor(
    private localNotifications: LocalNotifications,
    private eventService: EventService,
  ) {
    console.log("reminders service instanciated")

  }

  addReminder = (databaseReminder) => {
    console.log("adding event")
    // calculate the time left to the reminder
    let reminder = databaseReminder.val();

    let timeStr = reminder.startTime;
    timeStr = timeStr.slice(0, -1);

    let timeLeftMs = new Date(timeStr).getTime() - new Date().getTime();
    timeLeftMs = timeLeftMs > 0 ? timeLeftMs : 0;

    console.log(timeLeftMs)

    // registering a callback at the time of the reminder and saving the Timeout object
    const callbackTimeout = setTimeout(() => this.reminderCallBack(reminder), timeLeftMs);

    // adding the Timeout object
    reminder.callbackTimeout = callbackTimeout;

    // adding the reminder to the local array
    this.reminders.push(reminder);
  }

  removeReminder = (databaseReminder) => {
    console.log("removing event")

    let reminderObject = databaseReminder.val();

    // getting local reminder
    const reminder = this.reminders.find(rem => rem.eventId === reminderObject.eventId);
    if (reminder == undefined){
      throw new Error("removeReminder: reminder not found.")
    }

    // removing the callback if not yet executed
    clearTimeout(reminder.callbackTimeout);

    // removing local reminder
    this.reminders.filter(rem => rem.eventId != reminderObject.eventId);

  }

  reminderCallBack(reminder){
    console.log("callback called")
    // remove reminder from database
    //firebase.removeReminder(reminder.id)

    //eventService

    // sending a notification to user
    this.localNotifications.schedule({
      id: 1,
      title: "hi",
      text : "1 hour left to the event",
      foreground : true
    });

  }

}
