import { Component, OnInit } from '@angular/core';
import { DialogflowService, Message } from '../../services/dialogflow.service';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
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
   private chat: DialogflowService,private tts: TextToSpeech
 ) {

  this.tts.speak('hello')
  .then(() => console.log('Success'))
  .catch((reason: any) => console.log(reason));
 }
 
 ngOnInit() {
   // appends to array after each new message is added to feedSource
   this.messages = this.chat.conversation
    .asObservable().scan((acc, val) => acc.concat(val))
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }

 
}
