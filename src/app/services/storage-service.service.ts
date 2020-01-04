import { Inject, Injectable } from '@angular/core';

import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService) { }




  clearStorage() {

    this.storage.remove("email");
    this.storage.remove("imageUrl");
    this.storage.remove("name");
    this.storage.remove("ident");
    this.storage.remove("access_token");
    this.storage.remove("token");
    this.storage.remove("email");
  }

  setEmail(email: string) {

    console.log('recieved= Email:' + 'value:' + email);
    this.storage.set("email", email);

  }

  getPicture() {
    return this.storage.get("imageUrl");
  }


  setPicture(imageUrl: string) {

    this.storage.set("imageUrl", imageUrl);

  }

  getEmail() {
    return this.storage.get("email");

  }



  setName(name: string) {

    console.log('recieved= name:' + 'value:' + name);
    this.storage.set("name", name);

  }

  getName() {
    return this.storage.get("name");

  }

  setId(Id: string) {

    console.log('recieved= Id:' + 'value:' + Id);
    this.storage.set("ident", Id);

  }

  getId() {
    return this.storage.get("ident");

  }

  getAccessToken() {

    this.storage.get("access_token");

  }


  setAccessToken(access_token: any) {

    this.storage.set("access_token", access_token);

  }
  setToken(token: any) {

    this.storage.set("token", token);

  }

  getToken() {
    return this.storage.get("token");

  }

}
