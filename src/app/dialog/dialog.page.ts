import { Component, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';

declare var ApiAIPlugin: any;

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.page.html',
  styleUrls: ['./dialog.page.scss'],
})


export class DialogPage { 

  test: String = "";
  resolvedQuery: String = "";
  recordState: boolean = true;
  tmp: String = "";

  constructor(
    public platform: Platform, 
    public ngZone: NgZone,
    private tts: TextToSpeech
  ) {

    platform.ready().then(() => {
      console.log("platform ready");
      ApiAIPlugin.init(
        {
            clientAccessToken: "b66aa19735074425a09707bb7a2093eb", // insert your client access key here
            lang: "en" // set lang tag from list of supported languages
        },
        () => console.log("success"),
        () => console.log("error")
        )
    });

  }

//transforms text to speech
textToSpeech(text) {
  console.log('texttospeech')
  this.tts.speak({
    text: text,
    locale: 'en-GB',
    rate: 0.8})
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
}

//recordState boolean is used to change recording button icon
changeRecordState(): void {
  this.recordState = !this.recordState;
}

//start recording
sendVoice() {

  try {     
    
    ApiAIPlugin.setListeningStartCallback(function () {
      console.log("listening started");
    });
    
    ApiAIPlugin.setListeningFinishCallback(function () {
      console.log("listening stopped");
    });

    ApiAIPlugin.levelMeterCallback(function(level) {
      console.log(level);
    }); 
    
    ApiAIPlugin.requestVoice(
      {
      }, // empty for simple requests, some optional parameters can be here
      (response) => {
          // result processing 

          console.log("sendvoice response");
          this.resolvedQuery = response.result.resolvedQuery;
          console.log(response.result.resolvedQuery);
          this.tmp = "resp";
          //alert(JSON.stringify(response.result.fulfillment.speech));
          this.textToSpeech(JSON.stringify(response.result.fulfillment.speech));


      },
      (error) => {
          // error processing 
          this.tmp = "error";
          console.log("sendvoice error");
          alert(error);
      });                
  } catch (e) {
      alert(e);
  }
}


//stop recording
stopVoice() {
    ApiAIPlugin.stopListening();
    this.test = this.tmp;
    console.log(this.test);
}

//send request to dialogflow as a text query
sendText(text) {
  try {

      ApiAIPlugin.requestText(
          {
              query: text
          },
          (response) => {         
              // result processing 
              console.log('send text response');
              //alert(JSON.stringify(response.result.fulfillment.speech));
              console.log(response.result.fulfillment.speech);
              this.textToSpeech(response.result.fulfillment.speech);
          },
          function (error) {
              // error processing 
              console.log("sendtext error");
              alert(error);
          });
  } catch (e) {
      alert(e);
  }
}

}

