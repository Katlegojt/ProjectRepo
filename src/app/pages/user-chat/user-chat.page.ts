import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/module/user';


@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.page.html',
  styleUrls: ['./user-chat.page.scss'],
})
export class UserChatPage implements OnInit {
  user = {}as User;
  users;
  list
  uid;
  constructor(private afAuth: AngularFireAuth, public firestore: AngularFirestore, private router: Router) { 

    this.uid = this.afAuth.auth.currentUser.uid; 
    this.users = this.firestore.collection('users').snapshotChanges().subscribe(data => {
      this.list = data.map ( e => {
        return{
          key: e.payload.doc.id,
          ...e.payload.doc.data()
        } as User;
      });
      console.log(this.users);
 
     });
 
    
  }

  ngOnInit() {
  }

  updateItem(){

    this.router.navigate(['/page1'], { queryParams: { userID:  this.afAuth.auth.currentUser.uid } });

  }

}
