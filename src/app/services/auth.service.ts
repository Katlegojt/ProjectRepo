import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, } from '@angular/fire/firestore';
import { User } from '../module/user';
import { NavController } from '@ionic/angular';
import { auth } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private db: AngularFirestore, public navCtrl: NavController,  ) { }
  user = {} as User;


  // register user
   async register( user: User) {
    try {
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(credential => {
      return this.db.collection('users').doc(credential.user.uid).set({
        username : user.name,
        email : user.email,
      });
    });
    console.log(result);
    } catch (e) {

      console.error(e);
    }
  }
        // sign up
        signup(user: User) {
          this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then((credential) => {
            this.db.collection('users').doc(credential.user.uid).set({
              username : user.name,
              email : user.email,
              Bio : 'write something about yourself'
            });

            localStorage.setItem('userid', this.afAuth.auth.currentUser.uid);
            this.afAuth.auth.currentUser.updateProfile({
              displayName : user.name,
              photoURL: '',

            }).then(() => {
              this.navCtrl.navigateRoot('/login');

            }).catch(err => {
              alert(err.message);
            });
          }).catch(err => {
            alert(err.message);
          });

         }

  // login with email and password async method
  async login(user: User) {
    try {
     const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
     console.log(result);
     if (result) {
         this.navCtrl.navigateRoot('/menu/chat');

       }
    } catch (e) {

     console.error(e);
    }
   }


   // login with email and password
   login2(user: User) {
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(() => {
      this.navCtrl.navigateRoot('/menu/chat');
    }).catch(err => {
      alert(err.message);
    });
   }



   // login using facebook account
 async loginWithFACEBOOK() {
   try {
     const result = await this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
     console.log(result);
     if (result) {

         this.navCtrl.navigateRoot('/menu/chat');
       }
    } catch (e) {

     console.error(e);
    }

 }

 // login using twitter account
 async loginWithTwiter() {
   try {
     const result = await this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
     console.log(result);
     if (result) {

         this.navCtrl.navigateRoot('/menu/chat');
       }
    } catch (e) {

     console.error(e);
    }
 }

 // login using google credentials
 async googleSignIn() {

   try {
   const result = await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
   console.log(result);
   if (result) {

      this.navCtrl.navigateRoot('/menu/chat');
     }
  } catch (e) {

   console.error(e);
  }

}

// Anonymous login
 anonymous() {
  this.afAuth.auth.signInAnonymously().then(() => {
    localStorage.setItem('userid', this.afAuth.auth.currentUser.uid);
    this.navCtrl.navigateRoot('/menu/chat');
  }).catch(err => {
    alert(err.message);
  });
}

}
