import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { MessagesService } from '../shared/services/messages.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router,private message:MessagesService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let isAdmin=false
      if(this._auth.isLogged()){
        let roles:any
        roles=this._auth.roles

        this._auth.getUserRoles().subscribe(
          res=>{roles=res}
        )
        roles.forEach(element => { if(element=="ROLE_ADMIN")
          isAdmin=true
        });

        if(!isAdmin)
        {
         this.message.danger("You must have login as an Admin")
          this._router.navigate(['/login']);
        }
        return isAdmin;
      } else {
        console.log("Is NOT Logged");
        this._router.navigate(['/login']);
        return false;
      }

  }
  
}
