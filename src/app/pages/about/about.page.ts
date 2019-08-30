import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/module/user';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  user = {} as User
  constructor(private router: Router, private userS: UserService, private afAuth: AngularFireAuth,public navCtrl: NavController) { }

  ngOnInit() {

    const key = this.afAuth.auth.currentUser.uid;
    this.userS.getUser(key).subscribe( data =>{
      this.user = data;
   
      console.log(data)
    });
  }
  

}
