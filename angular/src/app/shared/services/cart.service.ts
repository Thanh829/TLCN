import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  myCount$: Observable<number>;

  private boolSubject: Subject<number>

  constructor(private http: HttpClient ) {
    this.boolSubject = new Subject<number>();
      this.myCount$ = this.boolSubject.asObservable();
   }

  ;

  

  setMyCount(newValue) {
    this.myCount$ = newValue;
    this.boolSubject.next(newValue);
  }
  getTotalItem(userId)
  {
    return this.http.get(`http://localhost:8090/api/v1/cart/count/${userId}`)
  }
  
  addToCart(songId,price,songName)
  {
    return this.http.post('http://localhost:8090/api/v1/cart/addtocart',{
      userId:1,
      price:price,
      songId:songId,
      songName:songName
    })

   
    

  }
  deleteCartItem(cartId)
  {
    return this.http.delete(`http://localhost:8090/api/v1/cart/delete/${cartId}`)
  }
}
