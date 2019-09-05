import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/firestore';
import { User } from '../module/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  private userDoc: AngularFirestoreDocument<User>;
user = {} as User;

//get users details
  getUser(key){
    
    this.userDoc = this.db.doc<User>('users/'+key);
    return this.userDoc.valueChanges();
  }
//update user Bio
  update(user, key) {
    this.userDoc = this.db.doc<User>('users/'+ key);
    this.userDoc.update(user);
  }
}
