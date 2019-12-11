# IT363agent
Remindr ChatBot Agent

Required Tools :
ionic :
npm install -g ionic cordova

First install dependencies :  
npm install

add your Firebase configuration into src/environments/environment.ts as follows :

export const environment = {
  production: false,
  firebase: {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
  }
};

then run : 
ionic serve

go to localhost:8100
