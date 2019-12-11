import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.page.html',
  styleUrls: ['./home-login.page.scss'],
})
export class HomeLoginPage implements OnInit {
  loading: any;
  constructor(
    private router: Router,
    private platform: Platform,
    private google:GooglePlus,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth
  ) { }

  async  ngOnInit() {
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });
  }

  async presentLoading(loading) {
    await loading.present();
  }

  async login() {
    let params;
    if (this.platform.is('android')) {
      params = {
        'webClientId': '1092298140547-p14j7di6e69duk5jfvbu0ju7or6jqtjg.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'https://www.googleapis.com/auth/plus.login',
        'response_type': 'token id_token'
            }
    }
    else {
      params = {
        'webClientId': '1092298140547-p14j7di6e69duk5jfvbu0ju7or6jqtjg.apps.googleusercontent.com',
        'offline': true,
            }
    }
    console.log(params);
    this.google.login(params)
      .then((response) => {
        console.log(response);
        const { idToken, accessToken } = response;
        this.onLoginSuccess(idToken,accessToken);
      }).catch((error) => {
        console.log(error)
        alert('error:' + JSON.stringify(error))
      });
  }

logout(){
  this.google.logout();

}
  

  onLoginSuccess(accessToken, accessSecret) {
    console.log(accessToken)

const credential = accessSecret ? 
    firebase.auth.GoogleAuthProvider.credential(accessToken, accessSecret) : 
    firebase.auth.GoogleAuthProvider.credential(accessToken);
    this.fireAuth.auth.signInWithCredential(credential)
      .then((response) => {
        this.router.navigate(["/events"]);
        this.loading.dismiss();
      })

  }
  onLoginError(err) {
    console.log(err);
  }
}

