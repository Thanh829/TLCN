import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { PaymentService } from 'src/app/shared/services/payment.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  constructor(private http: HttpClient,
    private router: ActivatedRoute,
    private paymentService: PaymentService,
    private message: MessagesService) { }
    paymentId:String
    token: String
    payerId:String

  ngOnInit() {
    this.paymentId= this.router.snapshot.queryParamMap.get('paymentId')
    this.token= this.router.snapshot.queryParamMap.get('token')
    this.payerId= this.router.snapshot.queryParamMap.get('PayerID')
  }

  excutePayment()
  {
    this.paymentService.excutePayment(this.paymentId,this.token,this.payerId).subscribe(
      res =>{
          this.message.success("Successfully Payment")
      }
    ) 
  }

}
