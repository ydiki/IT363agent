import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AuthService } from '../services/auth.service'
import {StorageServiceService}  from '../services/storage-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { LoadingController } from '@ionic/angular';
	declare var window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading: any;
  constructor(  public navCtrl: NavController,
    public googlaAuth: AuthService,
    private router: Router,
    private platform: Platform,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth,
    private storageAuth:StorageServiceService,
 ) { }

 async ngOnInit() {
    console.log(window);
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });
  }


  async presentLoading(loading) {
    await loading.present();
  }

  public login() {
    this.platform.ready()
      .then(this.googlaAuth.googleLogin)
      .then(response => {
        const { id_token, accessToken } = response;
        this.storageAuth.setAccessToken(accessToken); 
        this.storageAuth.setToken(id_token); 
        this.onLoginSuccess(id_token,accessToken);
        this.googlaAuth.googleProfileInfo(response).
        subscribe(profileResp=>{
          console.log(profileResp);
          this.storageAuth.setEmail(profileResp.email);
          this.storageAuth.setName(profileResp.name);
          this.storageAuth.setPicture(profileResp.picture);
          this.storageAuth.setId(profileResp.id);        
          this.storageAuth.setToken(profileResp.id);        
        });
      }, (error) => {
        alert(error);
      }).then();
  };


  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? 
    firebase.auth.GoogleAuthProvider.credential(accessToken, accessSecret) : 
    firebase.auth.GoogleAuthProvider.credential(accessToken);
    this.fireAuth.auth.signInWithCredential(credential)
      .then((response) => {
        console.log(response);
        this.router.navigate(["/home"]);
        this.loading.dismiss();
      })

  }
  onLoginError(err) {
    console.log(err);
  }


 
}
