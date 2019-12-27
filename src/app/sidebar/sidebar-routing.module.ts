import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidebarPage } from './sidebar.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/sidebar/profile',
    pathMatch: 'full'
  },
  {
    path: '',
    component: SidebarPage,
    children: [
      { path: 'profil', loadChildren: '../pages/profil/profil.module#ProfilPageModule' },
      { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
      { path: 'events-list', loadChildren: '../pages/events-list/events-list.module#EventsListPageModule'},
      { path: 'events', loadChildren: '../pages/events/events.module#EventsPageModule'},
      { path: 'events/:id',loadChildren: '../pages/events/events.module#EventsPageModule'}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidebarPageRoutingModule {}
