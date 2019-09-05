import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SocialSharing} from '@ionic-native/social-sharing/ngx';
import { PopoverPageModule } from './pages/popover/popover.module';
import { IonicStorageModule} from '@ionic/storage'
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-WebView/ngx';

const firebaseConfig = {
  apiKey: "AIzaSyAcCoAq2Y3y7tMIFxYG7JrvAM16gVWxN4k",
  authDomain: "myproject-e6714.firebaseapp.com",
  databaseURL: "https://myproject-e6714.firebaseio.com",
  projectId: "myproject-e6714",
  storageBucket: "myproject-e6714.appspot.com",
  messagingSenderId: "226031168994",
  appId: "1:226031168994:web:09cecb36c19271ec"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    PopoverPageModule,
    IonicStorageModule
  ],
    
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SocialSharing,Camera,File,WebView
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
