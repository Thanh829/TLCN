import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { InvoiceService } from 'src/app/shared/services/invoice.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-artist-revenue',
  templateUrl: './artist-revenue.component.html',
  styleUrls: ['./artist-revenue.component.scss']
})
export class ArtistRevenueComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: ActivatedRoute,
    private paymentService: PaymentService,
    private message: MessagesService,
    private authService: AuthService,
    private route: Router,
    private invoiceService: InvoiceService,
    private userService: UserService
  ) {}
  paymentId: String;
  token: String;
  payerId: String;
  invoice: any;
  revenue: any;
  user: any;
  date:any
  artistId:any
  userId:any
  total:number=0
  payee:any


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
    this.artistId = this.router.snapshot.queryParamMap.get("artistId");
    this.userId = this.userService.userId
    this.payee=this.userService.Payee

    console.log("token: " + this.userService.Payee);

    if (this.authService.isLogged()) {
      console.log(this.authService.getUser().id);
      this.user = this.authService.getUser();

      this.getDetailsRevenue()
      console.log("review");
    } else {
      console.log("login:" + this.authService.isLogged());
      this.message.danger("Session expired");
      this.route.navigate(["/login"]);
    }
  }

  excutePayment() {
    this.paymentService
      .artistExcutePayment(this.paymentId, this.token, this.payerId, this.artistId)
      .subscribe((res) => {
        this.invoiceService
          .createArtistInvoice(
            this.artistId,
            this.revenue,
            this.total,
            (this.total-this.total*this.paymentService.fee/100).toFixed(1),
           "sb-43gsoj3559342@business.example.com",
            this.payee
          )
          .subscribe((res) => {
            this.route.navigate(["/manage-artist"])
            this.message.success("Successfully Payment");
          });
      });
  }


  getDetailsRevenue()
  {
      this.paymentService.getDetailsRevenue(this.artistId).subscribe(
        res=>{
              this.revenue=res
              this.revenue.forEach(value => {
                this.total += parseFloat( value.total);})
                console.log("total "+ this.total)
        }
      )
  }

}
