import { Component, OnInit } from '@angular/core';
import { DialogflowService, Message } from '../../services/dialogflow.service';
import { Platform } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx'; 
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

  test: String = "";
  resolvedQuery: String = "";
  recordState: boolean = true;
  tmp: String = "";

 constructor(
   private chat: DialogflowService,
   private platform: Platform, 
   private speech: SpeechRecognition
 ) {
  
 }
 
 ngOnInit() {
   console.log('dekhlt l initon');
   if(this.platform.is('cordova')){
     this.speech.hasPermission()
      .then((hasPermission: boolean) => {
        if(!hasPermission)
          this.speech.requestPermission()
            .then(
              () => console.log('Granted'),
              () => console.log('Denied')
            );
        });
   }else{
     alert('Plugin only for mobile device')
   }
   // appends to array after each new message is added to feedSource
   this.messages = this.chat.conversation
    .asObservable().scan( (acc,val) => acc.concat(val))
  }

  start(){
    console.log('dekhlt lspeech');
    this.speech.startListening()
    .subscribe(
      (matches: string[]) => {
        console.log('matches');
        console.log(matches);
        this.formValue = matches[0];
        this.sendMessage();
      }
    );
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }

  //recordState boolean is used to change recording button icon
  changeRecordState(): void {
    this.recordState = !this.recordState;
  }

 
}
