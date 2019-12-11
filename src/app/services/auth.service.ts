import { Inject,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
declare var window: any;
@Injectable()
export class AuthService {

  constructor(public http: HttpClient) { }

  public googleLogin(): Promise<any> {
    return new Promise(function (resolve, reject) {
      const clientId = "1092298140547-p14j7di6e69duk5jfvbu0ju7or6jqtjg.apps.googleusercontent.com";
      const url = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}`+
         "&redirect_uri=http://localhost:8100" +
         "&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/plus.login" +
         "&response_type=token id_token"+
         "&offline=true";
      const browserRef = window.cordova.InAppBrowser.open(
        url,
        "_blank",
        "location=no, clearsessioncache=yes, clearcache=yes"
      );
      let responseParams: string;
      let parsedResponse: Object = {};
      browserRef.addEventListener("loadstart", (evt) => {
        if ((evt.url).indexOf("http://localhost:8100") === 0) {
          console.log(browserRef);
          browserRef.removeEventListener("exit", (evt) => { });
          browserRef.close();
          responseParams = ((evt.url).split("#")[1]).split("&");
          for (var i = 0; i < responseParams.length; i++) {
            parsedResponse[responseParams[i].split("=")[0]] = responseParams[i].split("=")[1];
          }
          if (parsedResponse["access_token"] !== undefined &&
            parsedResponse["access_token"] !== null) {
            console.log(parsedResponse);  
            resolve(parsedResponse);
          } else {
            reject("Problème d’authentification avec Google");
          }
        }
      });
      browserRef.addEventListener("exit", function (evt) {
        reject("Une erreur est survenue lors de la tentative de connexion à Google");
      });
    });
  }

  googleProfileInfo(response): Observable<any>{
    const {tokenId,access_token} = response;
    console.log(tokenId,access_token);
    const url = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json"+
    `&access_token=${access_token}`
    return this.http.get(url);
  }






}
