import { Component, OnInit } from '@angular/core';
import { StorageServiceService } from '../../services/storage-service.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  constructor(private storageServ: StorageServiceService) {
    this.username = this.storageServ.getName();
    this.pictureUrl = this.storageServ.getPicture();
    this.email = this.storageServ.getEmail();
  }
  private username: string;
  private pictureUrl: string;
  private email: string;

  ngOnInit() {


  }

}
