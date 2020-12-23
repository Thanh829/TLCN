import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AnyLengthString } from "aws-sdk/clients/comprehendmedical";
import { TimePickerHammerConfig } from "igniteui-angular";
import { MessagesService } from 'src/app/shared/services/messages.service';
import { PaymentService } from "src/app/shared/services/payment.service";
import { UserService } from "src/app/shared/services/user.service";
@Component({
  selector: "app-artist-management",
  templateUrl: "./artist-management.component.html",
  styleUrls: ["./artist-management.component.scss"],
})
export class ArtistManagementComponent implements OnInit {
  constructor(private router: Router, private userService: UserService, private message: MessagesService,private paymentService: PaymentService) {}

  artists: any;
  link :any
  count:any
  pageNumber:number[]=[]
  ngOnInit() {

    this.userService.countArtist().subscribe(
      res=>{
        this.count=res
        this.count = res;
        if (this.count % 4 != 0) {
          this.count = this.count / 4 + 1;
        } else {
          this.count = this.count / 4;
        }
        for (let i=1;i<=this.count;i++)
        {
           this.pageNumber.push(i) 
        }
        if(res!=0)
        this.getPageArtist(0)
      }
    )
    
  }
  getPageArtist(page)
  {
      this.userService.getPageArtist(page).subscribe(
        res=>{
          this.artists=res
        }
      )
  }
  disableArtist(artistId,i)
  {
    this.userService.disableArtist(artistId).subscribe(
      res=>{
        console.log(res)
        this.message.success("Disable successful")
        this.artists[i].active=false
      }
    )
  }

  enableArtist(artistId,i)
  {
    this.userService.enableArtist(artistId).subscribe(
      res=>{
        console.log(res)
        this.message.success("Enable successful")
        this.artists[i].active=true
      }
    )
  }

  getRevenueOfArtist(artistId,userId,payee)
  {
      this.router.navigate(['/revenue'],{queryParams:{artistId:artistId}})
      this.userService.Payee= payee
      this.userService.artistId= artistId
      this.userService.userId=userId
      console.log(this.userService.Payee)
  }
  
  checkout(artistId,paypalAccount, payslip,userId)
  {
    this.userService.Payee= paypalAccount
    this.userService.userId=userId
    payslip = (payslip-payslip*this.paymentService.fee/100).toFixed(1)
    this.paymentService.checkout(paypalAccount,[],payslip,"USD","Paypal","sale","Payment for artist",`http://localhost:4200/revenue?artistId=${artistId}`).subscribe(
      res=>{
        this.link= res
        console.log(this.link.url)
        window.open (this.link.url.toString()),"_blank";
      }
    )
  }
 
}
