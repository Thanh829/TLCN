import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { CartService } from "src/app/shared/services/cart.service";
import { PaymentService } from "src/app/shared/services/payment.service";
import { TagService } from "src/app/shared/services/tag.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  logged: boolean = true;
  showMenu: boolean = false;
  user: any = null;
  totalItem: any = 0;
  show: boolean = false;
  feeForm: FormGroup;
  tags: any;
  constructor(
    private _auth: AuthService,
    private cartService: CartService,
    private paymentService: PaymentService,
    private tagService: TagService
  ) {
   
  }

  ngOnInit() {
    this.cartService.myCount$.subscribe((newCount: number) => {
      this.totalItem = newCount;
    });
    this.tagService.getALLTag().subscribe((res) => {
      this.tags = res;
    });
    this.feeForm = new FormGroup({
      fee: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      }),
    });

    //this.loadCartItem()
    this._auth.userEmitter.subscribe((user) => {
      this.user = user;
    });
    this._auth.statusEmitter.subscribe((status) => {
      this.logged = status;
      this.showMenu = false;
    });
    this.logged = this._auth.logged;
    this.user = this._auth.user;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  setFee() {
    if (this.feeForm.value.fee) {
      this.paymentService.setFee(this.feeForm.value.fee);
    }
    console.log(this.paymentService.fee / 100);
    this.showForm();
  }

  logout() {
    this._auth.logout();
    window.location.reload()
  }
  showForm() {
    this.show = !this.show;
  }

  loadCartItem() {
    this.cartService.getTotalItem().subscribe((res) => {
      this.totalItem = res;
    });
  }
}
