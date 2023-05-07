import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: firebase.User | null = null;
  user$: any;
  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe(user => {
      this.user = user;
    });
   }


  login(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password : string){

    return this.auth.createUserWithEmailAndPassword(email,password);
  }

  isUserLoggedIn() {
    return this.auth.user;
  }

  logout() {
    return this.auth.signOut();
  }

  getCurrentUserId(): string | null {
    return this.user ? this.user.uid : null;
  }
}
