import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DialogChatPage } from './dialog-chat.page';

const routes: Routes = [
  {
    path: '',
    component: DialogChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DialogChatPageRoutingModule {}
