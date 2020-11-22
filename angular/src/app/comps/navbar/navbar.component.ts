import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  logged: boolean = true;
  showMenu: boolean = false;
  user: any = null;
  totalItem: any=0;

  constructor(private _auth: AuthService, private cartService: CartService) { 
    cartService.myCount$.subscribe((newCount: number)=> {this.totalItem=newCount;})
    
  }

  ngOnInit() {
    
   this.loadCartItem()
    this._auth.userEmitter.subscribe((user)=>{
      this.user = user;
    });
    this._auth.statusEmitter.subscribe((status)=>{
      this.logged = status;
      this.showMenu = false;
    });
    this.logged = this._auth.logged;
    this.user = this._auth.user;
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  logout(){
    this._auth.logout();
  }

  loadCartItem()
  {
    this.cartService.getTotalItem().subscribe(
      res=>{
        this.totalItem=res;
       
      }
    )
  }

}
