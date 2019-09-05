import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/module/user';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  user = {} as User;

  
  constructor(private navParams : NavParams, private afAuth: AngularFireAuth,private userS: UserService, private popover : PopoverController) { 


  }

  ngOnInit() {

    const key = this.afAuth.auth.currentUser.uid;
    this.userS.getUser(key).subscribe( data =>{
     
      this.user.username = data.username;
      this.user.gender = data.gender;
      this.user.email = data.email
      this.user.Bio = data.Bio;

     
      console.log(data)
    });
  }

  update(user:User){
    const key = this.afAuth.auth.currentUser.uid;
    this.userS.update(user, key);
    this.popover.dismiss();
  }

}
