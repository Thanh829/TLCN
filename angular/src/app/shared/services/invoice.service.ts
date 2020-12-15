import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private invoiceId:number
  private userId:number
  private isReview:boolean=true
  constructor(private http: HttpClient) { }

  createArtistInvoice(userId, items,subtotal,total,payer,payee)
  {
    return this.http.post('http://localhost:8090/api/v1/invoice/create-artist-invoice',{
      artistId: userId,
      items: items,
      subtotal: subtotal,
      total:  total,
      payer:payer,
     payee:payee,
     date:""
    })
  }

  createInvoice(userId, userName, orderDate, payeeEmail, paymentId,totalCost)
  {
    return this.http.post('http://localhost:8090/api/v1/invoice/create',{
      userId: userId,
      userName: userName,
      orderDate: orderDate,
      payeeEmail:  payeeEmail,
      paymentId:paymentId,
      totalCost: totalCost
    })
  }

  setInvoiceId(invoiceId)
  {
      this.isReview=false
      this.invoiceId=invoiceId
  }
  setUserId(userId)
  {
      this.userId=userId
  }


  getPersonalInvoices()
  {
    return this.http.get(`http://localhost:8090/api/v1/invoice/personal/all?userId=${this.userId}`)   
  }

  getOneInvoice()
  {
    return this.http.get(`http://localhost:8090/api/v1/invoice/personal?invoiceId=${this.invoiceId}`)   

  }

  getDetailsInvoice(id)
  {
    return this.http.get(`http://localhost:8090/api/v1/invoice/artist?id=${id}`)   

  }

}
