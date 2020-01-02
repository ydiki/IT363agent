import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidebarPage } from './sidebar.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/sidebar/profil',
    pathMatch: 'full'
  },
  {
    path: '',
    component: SidebarPage,
    children: [
      { path: 'profil', loadChildren: ()=> import('../pages/profil/profil.module').then( m => m.ProfilPageModule) },
      { path: 'events-list', loadChildren: () => import('../pages/events-list/events-list.module').then( m => m.EventsListPageModule) },
      { path: 'events', loadChildren: () => import('../pages/events/events.module').then( m => m.EventsPageModule) },
      { path: 'events/:id', loadChildren: () => import('../pages/events/events.module').then( m => m.EventsPageModule)},
      { path: 'dialog', loadChildren: () => import('../pages/dialog/dialog.module').then( m => m.DialogPageModule)},
      { path: 'dialogchat', loadChildren: () => import('../pages/dialog-chat/dialog-chat.module').then( m => m.DialogChatPageModule) },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidebarPageRoutingModule {}
