import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage, 
    children:[

      { path: 'chat', loadChildren: '../chat/chat.module#ChatPageModule' },
      { path: 'about', loadChildren: '../about/about.module#AboutPageModule' },
      { path: 'user-chat', loadChildren: '../user-chat/user-chat.module#UserChatPageModule' },
      { path: 'page1', loadChildren: '../page1/page1.module#Page1PageModule' },
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
