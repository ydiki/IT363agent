import { Component, OnInit } from '@angular/core';
import { DialogflowService, Message } from '../services/dialogflow.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'app-dialog-chat',
  templateUrl: './dialog-chat.page.html',
  styleUrls: ['./dialog-chat.page.scss'],
})
export class DialogChatPage implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;
 
 constructor(
   private chat: DialogflowService,
 ) {}
 
 ngOnInit() {
   // appends to array after each new message is added to feedSource
   this.messages = this.chat.conversation
    .asObservable().scan((acc, val) => acc.concat(val));
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }

}
