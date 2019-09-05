import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.page.html',
  styleUrls: ['./page1.page.scss'],
})
export class Page1Page implements OnInit {
  text;
  chatRef;
  constructor(private route: ActivatedRoute,private afAuth: AngularFireAuth, public firestore: AngularFirestore) {

    this.chatRef = this.firestore.collection('userChats', ref => ref.orderBy('Timestamp')).valueChanges();
   }

  userID;
  ngOnInit() {
    this.route.queryParams
    
    .subscribe(params => {

      this.userID = params.userID;
      console.log(this.userID); // popular
    });
}


send() {

  
  }
}


