import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DialogChatPageRoutingModule } from './dialog-chat-routing.module';

import { DialogChatPage } from './dialog-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DialogChatPageRoutingModule
  ],
  declarations: [DialogChatPage]
})
export class DialogChatPageModule {}
