import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MenuPage, 
    children:[

      { path: 'chat', loadChildren: '../chat/chat.module#ChatPageModule' ,canActivate:[AuthGuard ]},
      { path: 'about', loadChildren: '../about/about.module#AboutPageModule' ,canActivate:[AuthGuard ]},
      { path: 'user-chat', loadChildren: '../user-chat/user-chat.module#UserChatPageModule',canActivate:[AuthGuard ] },
      { path: 'page1', loadChildren: '../page1/page1.module#Page1PageModule',canActivate:[AuthGuard ] },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
