import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

 checkout(items,price,currency,method,intent,description)
 {
  return this.http.post('http://localhost:8090/pay',{
    items:items,
    total:price,
    currency: "USD",
    method:method,
    intent:"sale",
    description: "ban"

  })
 }

 excutePayment(paymentId,token,payerId)
 {
    return this.http.get(`http://localhost:8090/pay/success?paymentId=${paymentId}&token=${token}&PayerID=${payerId}`)
 }
}
