import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // {
  //   path: 'events',
  //   loadChildren: () => import('./pages/events/events.module').then( m => m.EventsPageModule)
  // },
  {
    path: 'events/:id',
    loadChildren: () => import('./pages/events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sidebar',
    loadChildren: () => import('./sidebar/sidebar.module').then( m => m.SidebarPageModule)
  },
  { path: 'dialog',
    loadChildren: () => import('./pages/dialog/dialog.module').then( m => m.DialogPageModule)
  },
  {
    path: 'dialogchat',
    loadChildren: () => import('./pages/dialog-chat/dialog-chat.module').then( m => m.DialogChatPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
