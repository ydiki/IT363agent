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
   }
   
// Adds message to source
 update(msg: Message) {
  this.conversation.next([msg]);
}

// Sends and receives messages via dialogflow
converse(msg: string) {
  const date1 = new Date();
  const userMessage = new Message(msg, 'user',date1.toISOString());
  this.update(userMessage);
  
  const options = {
   sessionId: 'session______id',
  //  resetContexts : true, 
   contexts:[{
     name : 'token',
     parameters: {
      access_token : this.storageAuth.getAccessToken(),
      idToken : this.storageAuth.getToken(),
     },
     lifespan:4,
   }]
    
  }

  console.log(this.client.textRequest(msg,options));
  return this.client.textRequest(msg,options)
    .then(res => {
      const speech = res.result.fulfillment.speech;
      const date2 = new Date();
      const botMessage = new Message(speech, 'bot',date2.toISOString());
      this.update(botMessage);
    });
}

}

export class Message {
  constructor(public content: string, public sentBy: string,public date: string) {}
 }
 