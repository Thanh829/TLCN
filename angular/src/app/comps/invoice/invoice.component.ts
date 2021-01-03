import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";
import { CartService } from "src/app/shared/services/cart.service";
import { InvoiceService } from "src/app/shared/services/invoice.service";
import { MessagesService } from "src/app/shared/services/messages.service";
import { PaymentService } from "src/app/shared/services/payment.service";

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.scss"],
})
export class InvoiceComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: ActivatedRoute,
    private paymentService: PaymentService,
    private message: MessagesService,
    private authService: AuthService,
    private route: Router,
    private invoiceService: InvoiceService,
    private cartService: CartService
  ) {}
  paymentId: String;
  token: String;
  payerId: String;
  invoice: any;
  date: any;
  user: any;

  ngOnInit() {
    const options = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    };

    this.date = new Date().toLocaleDateString("en-US", options);
    this.paymentId = this.router.snapshot.queryParamMap.get("paymentId");
    this.token = this.router.snapshot.queryParamMap.get("token");
    this.payerId = this.router.snapshot.queryParamMap.get("PayerID");

    console.log("token: " + this.token);

    if (this.authService.isLogged()) {
      console.log(this.authService.getUser().id);
      this.user = this.authService.getUser();

      this.getReviewPayment();
      console.log("review");
    } else {
      console.log("login:" + this.authService.isLogged());
      this.message.danger("Session expired");
      this.route.navigate(["/login"]);
    }
  }

  excutePayment() {
    this.paymentService
      .excutePayment(this.paymentId, this.token, this.payerId, this.user.id)
      .subscribe((res) => {
        this.invoiceService
          .createInvoice(
            this.user.id,
            this.user.email,
            this.date,
            this.invoice.transaction.payee.email,
            this.paymentId,
            this.invoice.transaction.amount.total
          )
          .subscribe((res) => {
            this.message.success("Successfully Payment");
            this.route.navigate(["/cart"])
            this.cartService.setMyCount(0)
          });
      });
  }

  getReviewPayment() {
    this.paymentService.getReviewPayment(this.paymentId).subscribe((res) => {
      this.invoice = res;
      console.log("invoice: ");
      console.log("invoice: " + this.invoice);
    });
  }
}
