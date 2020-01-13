import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthService } from './services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AngularFireAuthModule  } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { StorageServiceModule} from 'angular-webstorage-service';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import {  InAppBrowser} from '@ionic-native/in-app-browser/ngx'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(),
    AngularFireAuthModule,
    StorageServiceModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TextToSpeech,
    SpeechRecognition,
    InAppBrowser,
    NativeStorage,
    AuthService,
    LocalNotifications,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
