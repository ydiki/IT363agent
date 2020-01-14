import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {

  reminders = []

  constructor( private localNotifications: LocalNotifications ) {
    console.log("reminders service instanciated")

  }

  addReminder(databaseReminder) {

    // calculate the time left to the reminder
    const timeLeftMs = databaseReminder.date.getTime() - new Date().getTime();

    // registering a callback at the time of the reminder and saving the Timeout object
    const callbackTimeout = setTimeout(() => this.reminderCallBack(reminder), timeLeftMs);

    // creating the reminder by adding the Timeout object
    let reminder = databaseReminder;
    reminder.callbackTimeout = callbackTimeout;

    // adding the reminder to the local array
    this.reminders.push(reminder);
  }

  removeReminder(databaseReminder){

    // getting local reminder
    const reminder = this.reminders.find(rem => rem.id === databaseReminder.id);
    if (reminder == undefined){
      throw new Error("removeReminder: reminder not found.")
    }

    // removing the callback if not yet executed
    clearTimeout(reminder.callbackTimeout);

    // removing local reminder
    this.reminders.filter(rem => rem.id != databaseReminder.id);

  }

  reminderCallBack(reminder){

    // remove reminder from database
    //firebase.removeReminder(reminder.id)

    // sending a notification to user
    this.localNotifications.schedule({
      id: reminder.id,
      title: reminder.title,
      text : "1 hour left to the event",
      foreground : true
    });

  }

}
