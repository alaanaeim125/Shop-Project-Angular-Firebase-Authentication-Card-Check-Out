import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/observable';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private authSer: AuthService, private userSer: UserService) {
    this.user$ = afAuth.authState;
  }

  canActivate(): Observable<boolean> {
    return this.authSer.appUser$.map(AppUser => AppUser.isAdmin);
  }

}
