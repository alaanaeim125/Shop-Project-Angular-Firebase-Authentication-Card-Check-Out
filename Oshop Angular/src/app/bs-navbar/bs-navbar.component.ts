import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Observable } from 'rxjs/observable';
import { ShoppingCart } from '../models/shoppingCart';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {

  authState$;
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(
      private authServ: AuthService,
      private afAuth: AngularFireAuth,
      private router: Router,
      private cartServ: ShoppingCartService) {

    // to print authStates Os User
    afAuth.authState.subscribe(res => console.log(res));

    // take user Object States from services
    this.authState$ = authServ.username$;

    authServ.appUser$.subscribe(appUser => this.appUser = appUser);
   }

  logOut() {
    this.authServ.logOut();
    this.router.navigate(['/']);
  }

  async ngOnInit() {
    this.cart$ = (await this.cartServ.getCart());
  }
}
