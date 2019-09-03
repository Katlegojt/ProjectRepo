import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  text: string;
  chatRef: any;
  uid: string;

  constructor( private afAuth: AngularFireAuth, public firestore: AngularFirestore) {

<<<<<<< HEAD
    // this.uid = localStorage.getItem('userid');
    //this.chatRef = this.firestore.collection('chats').valueChanges();
    this.uid = this.afAuth.auth.currentUser.uid;
    this.chatRef = this.firestore.collection('chats', ref=>ref.orderBy('Timestamp')).valueChanges();
=======
    this.uid = this.afAuth.auth.currentUser.uid;
    // this.uid = localStorage.getItem('userid');
    // this.chatRef = this.firestore.collection('chats').valueChanges();
    this.chatRef = this.firestore.collection('chats', ref => ref.orderBy('Timestamp')).valueChanges();
>>>>>>> 3714e345b69c1882c4d52f87228a77b235d1735f
   }

  ngOnInit() {
  }

send() {

if (this.text !== '') {
  this.firestore.collection('chats').add({
    Name : this.afAuth.auth.currentUser.displayName,
    Message : this.text,
    UserID : this.afAuth.auth.currentUser.uid,
    Timestamp : Date.now(),

  });
  this.text = '';
}

}


}
