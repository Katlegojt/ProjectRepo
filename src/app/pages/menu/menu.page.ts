import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/module/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath = '';
user = {} as User;

  pages = [
    {title:'Chat Page', url:'/menu/chat'},
    {title:'Profile', url:'/menu/about'},
    {title  :'user-chat' , url:'/menu/user-chat'}
  ]
  email;
  uid;
  profile;
  constructor(private router: Router, private userS: UserService, private afAuth: AngularFireAuth,public navCtrl: NavController,public firestore: AngularFirestore ) { 
    this.router.events.subscribe((event : RouterEvent) => {

      this.selectedPath = event.url;
    });
    

  }

 
  ngOnInit() {

    const key = this.afAuth.auth.currentUser.uid;
    this.userS.getUser(key).subscribe( data =>{
      this.user = data;
   
      console.log(data)
    });

    
  }

  signOut(){

      this.afAuth.auth.signOut();
      this.navCtrl.navigateRoot('/');

  }


 
}
