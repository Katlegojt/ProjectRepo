import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/module/user';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PopoverPage } from '../popover/popover.page';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  user = {} as User;
  gender;
  img : string;
  constructor(private router: Router, private userS: UserService,
     private afAuth: AngularFireAuth,public navCtrl: NavController, private sSharing : SocialSharing,
   private popover: PopoverController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
   ) { 



   }

  ngOnInit() {

    const key = this.afAuth.auth.currentUser.uid;
    this.userS.getUser(key).subscribe( data =>{
      this.user = data;
      this.gender = this.user.gender;

      if(this.gender == 'male'){

 this.img = "/assets/img/1200px-Pac_Man.svg.png";
      }else{

this.img = "/assets/img/ms pac.jpg"
      }
      console.log(data)
    });
  }


  sharingInsta(user : User){
    this.sSharing.shareViaInstagram(user.email, null);
  }
  
  async openPopover( ev : Event){
    const popover = await this.popover.create({
      component : PopoverPage,
      componentProps :{
        

      }

    });

    popover.present();
  }

}
