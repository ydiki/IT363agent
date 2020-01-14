import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { StorageServiceService } from '../services/storage-service.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.page.html',
  styleUrls: ['./sidebar.page.scss'],
})
export class SidebarPage implements OnInit {

  ngOnInit() {


   }

  constructor(private menu: MenuController, private storageServ: StorageServiceService, public alertController: AlertController, private navCtrl: NavController) {
    this.username = this.storageServ.getName();
    this.pictureUrl = this.storageServ.getPicture();
  }

  rubric = [
    {
      title: 'Profil',
      url: '/sidebar/profil',
      icon: 'contact'
    },
    {
      title: 'Chatbot',
      url: '/sidebar/dialogchat',
      icon: 'ios-chatboxes'
    },
    {
      title: 'Reminders',
      url: '/sidebar/events-list',
      icon: 'ios-alarm'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'log-out'
    }
  ];
  // projectlist:[{id:string,name:name}]
  private username: string;
  private pictureUrl: string;

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Add a new project name',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Add',
          handler: data => {
            // this.add_project(data.name);

          }
        }
      ]
    });

    await alert.present();

  }

  // add_project(title) {
  //   this.sidserv.add_projects(title).subscribe(response => {
  //     console.log(response);
  //   })
  //   this.myprojects();
  // }

  // myprojects() {
  //   this.sidserv.get_projects().subscribe(response => {
  //     this.rubric[2].child = response;
  //   })
  //   console.log(this.rubric);
  // }




  logout() {
    this.navCtrl.navigateRoot('login');
    console.log("logout")
  }

}
