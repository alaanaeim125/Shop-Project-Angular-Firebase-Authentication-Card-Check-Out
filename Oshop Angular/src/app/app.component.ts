import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authSer: AuthService, private router: Router, private userSer: UserService) {
    authSer.username$.subscribe(user => {

      if (!user) {
        return;
        } else {
        userSer.saveUser(user);

        const returnUrl = localStorage.getItem('returnUrl');

        if (!returnUrl) {
          return;
        } else {
          localStorage.removeItem('returnUrl');
          this.router.navigateByUrl(returnUrl);
        }
      }
    });
  }
}
