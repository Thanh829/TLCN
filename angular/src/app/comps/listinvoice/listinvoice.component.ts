import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";
import {
  songCardTrigger,
  fadeTrigger,
} from "../../shared/animations/animations";
import {
  IgxFilterOptions,
  IgxListComponent,
  IgxToastComponent,
} from "igniteui-angular";
import { IPayPalConfig, ICreateOrderRequest } from "ngx-paypal";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CartService } from "src/app/shared/services/cart.service";
import { MusicPlayerService } from "src/app/shared/services/music-player.service";
import { PaymentService } from "src/app/shared/services/payment.service";
import { InvoiceService } from "src/app/shared/services/invoice.service";
import { element } from "protractor";

@Component({
  selector: "app-listinvoice",
  templateUrl: "./listinvoice.component.html",
  styleUrls: ["./listinvoice.component.scss"],
  animations: [songCardTrigger, fadeTrigger],
})
export class ListinvoiceComponent implements OnInit {
  public search: string;
  public data: any[] = [];
  time: number = 100;
  role: any;

  @ViewChild("mainIgxList", { static: true })
  public list: IgxListComponent;
  get fo() {
    const _fo = new IgxFilterOptions();
    _fo.key = "name";
    _fo.inputValue = this.search;
    return _fo;
  }
  constructor(
    private _auth: AuthService,
    private _http: HttpClient,
    private invoiceService: InvoiceService,
    private router: Router,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    if (this.checkRoleMod() == false) {
      this.loadInvoices();
    } else {
      this.loadArtistInvoices();
    }
  }

  getInvoice(paymentId) {
    this.router.navigate(["/invoice"], {
      queryParams: { paymentId: paymentId },
    });
  }

  getDetailsInvoice(invoiceId) {
    this.router.navigate(["/artist-detail-invoice"], {
      queryParams: { id: invoiceId },
    });
  }

  checkRoleMod() {
    this.role = this._auth.getUser().roles;
    let isMod = false;
    this.role.forEach((element) => {
      if (element == "ROLE_MODERATOR") {
        isMod = true;
      }
    });

    return isMod;
  }

  loadInvoices() {
    // Search
    this._http
      .get(
        `http://localhost:8090/api/v1/invoice/personal/all?userId=${
          this._auth.getUser().id
        }`
      )
      .subscribe(
        (res: any) => {
          let newSongs = res.map((s) => {
            //s.path = s.url;
            return s;
          });

          // Stagger animation
          for (let i = 0; i < newSongs.length; i++) {
            setTimeout(() => {
              this.data.push(newSongs[i]);
            }, i * this.time);
          }
        },
        (error) => {},
        () => {}
      );
  }

  loadArtistInvoices() {
    // Search
    this._http
      .get(
        `http://localhost:8090/api/v1/invoice/artist/get-artist-invoices?artistId=${
          this._auth.getUser().artistId
        }`
      )
      .subscribe(
        (res: any) => {
          let newSongs = res.map((s) => {
            //s.path = s.url;
            return s;
          });

          // Stagger animation
          for (let i = 0; i < newSongs.length; i++) {
            setTimeout(() => {
              this.data.push(newSongs[i]);
            }, i * this.time);
            console.log(this.data);
          }
        },
        (error) => {},
        () => {}
      );
  }
}
