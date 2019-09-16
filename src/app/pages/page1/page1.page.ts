import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/module/user';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.page.html',
  styleUrls: ['./page1.page.scss'],
})
export class Page1Page implements OnInit {
  text;
  chatRef;
 
  userID;
  name;
  uid;
  UserID1;
  private userDoc: AngularFirestoreDocument<User>;
  constructor(private route: ActivatedRoute,private afAuth: AngularFireAuth, public firestore: AngularFirestore) {
    this.uid = this.afAuth.auth.currentUser.uid;
    this.chatRef = this.firestore.collection('userChats', ref=> ref.orderBy('Timestamp')).valueChanges();
   // this.chatRef = this.firestore.collection('userChats' ,ref => ref.where("UserID2", "==", this.userID)).valueChanges();
   this.route.queryParams
   .subscribe(params => {
     this.name = params.name;
     this.userID = params.key;
     console.log(this.userID, this.name); // popular
   });
   }

 
  ngOnInit() {
    

   
}


send() {

  if (this.text !== '') {
    this.firestore.collection('userChats').add({
      Name : this.afAuth.auth.currentUser.displayName,
      Message : this.text,
      UserID1 : this.afAuth.auth.currentUser.uid,
      UserID2 : this.userID,
      Timestamp : Date.now(),
  
    });
    this.text = '';
  }
  }
}


