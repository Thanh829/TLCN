import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

 checkout(payee,items,price,currency,method,intent,description,successUrl)
 {
  return this.http.post('http://localhost:8090/pay',{
    emailPaypal: payee,
    items:items,
    total:price,
    currency: "USD",
    method:method,
    intent:intent,
    description: "ban",
    successUrl: successUrl

  })
 }

 excutePayment(paymentId,token,payerId,userId)
 {
    return this.http.get(`http://localhost:8090/pay/success?paymentId=${paymentId}&token=${token}&PayerID=${payerId}&userId=${userId}`)
 }

 artistExcutePayment(paymentId,token,payerId,userId)
 {
    return this.http.get(`http://localhost:8090/artist/pay/success?paymentId=${paymentId}&token=${token}&PayerID=${payerId}&userId=${userId}`)
 }
 getReviewPayment(paymentId)
 {
  return this.http.get(`http://localhost:8090/review?paymentId=${paymentId}`)
 }

 getDetailsRevenue(artistId)
 {
   return this.http.get(`http://localhost:8090/api/v1/artist/get-song-for-pay?artistId=${artistId}`)
 }
}
