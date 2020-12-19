import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { MessagesService } from '../shared/services/messages.service';

@Injectable({
  providedIn: 'root'
})
export class ModGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router,private message:MessagesService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let isMod=false
      if(this._auth.isLogged()){
        if(!this._auth.isArtist())
        {
         this.message.danger("You must have login as an Artist")
          this._router.navigate(['/login']);
        }
        return this._auth.isArtist();
      } else {
        console.log("Is NOT Logged");
        this._router.navigate(['/login']);
        return false;
      }

  }
  
}
