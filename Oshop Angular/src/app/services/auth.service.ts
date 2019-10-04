import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/observable';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // username: firebase.User;
  username$: Observable<firebase.User>;

  constructor(private userSer: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    // this.afAuth.authState.subscribe(user => this.username = user);
    this.username$ = afAuth.authState;
  }


  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logOut() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.username$
    .switchMap(user => {
      if (user) {
       return this.userSer.get(user.uid).valueChanges();
      } else {
        return Observable.of(null);
      }
    });
  }

}
