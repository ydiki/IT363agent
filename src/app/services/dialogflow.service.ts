                                                                                                                                                                                                                                                                                                                                                                                      import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {StorageServiceService}  from './storage-service.service';
@Injectable({
  providedIn: 'root'
})

export class DialogflowService {

  readonly token  = environment.dialogFlow.chatbot;
  readonly client = new ApiAiClient({accessToken: this.token});
  conversation = new BehaviorSubject<Message[]>([]);
  
  constructor( private storageAuth:StorageServiceService) {
  //  this.token =  this.storageAuth.getAccessToken();
   }

   
// Adds message to source
 update(msg: Message) {
  this.conversation.next([msg]);
}
// Sends and receives messages via dialogflow
converse(msg: string) {
  const userMessage = new Message(msg, 'user');
  this.update(userMessage);


  return this.client.textRequest(msg)
    .then(res => {
      const speech = res.result.fulfillment.speech;
      const botMessage = new Message(speech, 'bot');
      this.update(botMessage);
    });
}

}

export class Message {
  constructor(public content: string, public sentBy: string) {}
 }
 