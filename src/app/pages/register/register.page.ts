import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';



import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/module/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;

  user = {} as User
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private authS : AuthService,
    public afAuth : AngularFireAuth,
  ) { }

  

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'fullName': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])],
      
      
      
    });
  }

  async signUp( user : User) {

     this.authS.signup(user);

    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(() => {
      this.navCtrl.navigateRoot('');
    });
  }

  


  // // //
  goToLogin() {
    this.navCtrl.navigateRoot('/');
  }
}
