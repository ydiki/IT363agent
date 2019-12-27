# IT363agent
Remindr ChatBot Agent

Required Tools :
ionic : npm install -g ionic cordova

First install dependencies :  npm install

Attention :
- add your Firebase configuration into src/environments/environment.ts as follows :
- add also your access tocken for DialogFlow 


export const environment = {
  production: false,
  dialogFlow: {
      chatbot: 'XXXXXXXXXXXXXXXXXXXXX'
    },
  firebase: {
    apiKey: 'XXXXXXXXXXXX',
    authDomain: ''XXXXXXXXXXXX'',
    databaseURL: ''XXXXXXXXXXXX'',
    projectId: ''XXXXXXXXXXXX'',
    storageBucket: ''XXXXXXXXXXXX'',
    messagingSenderId: ''XXXXXXXXXXXX''
  }
};



then run : 
ionic serve
go to localhost:8100

Run on Android Studio:
ionic cordova emulate android -lc


