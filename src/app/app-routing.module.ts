import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)},
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'page1', loadChildren: './pages/page1/page1.module#Page1PageModule' },
 

  
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
