import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { S3 } from "aws-sdk";
import { Observable, Subject } from "rxjs";
import { MessagesService } from "./messages.service";

@Injectable({
  providedIn: "root",
})
export class CartService {
  myCount$: Observable<number>;
  bucket: any;

  private boolSubject: Subject<number>;

  constructor(private http: HttpClient, private message: MessagesService) {
    this.getTotalItem().subscribe(
      res=>{
        this.setMyCount(res)
      }
    )
    this.boolSubject = new Subject<number>();
    this.myCount$ = this.boolSubject.asObservable();
    this.bucket = new S3({
      accessKeyId: "AKIAWN2MVDPNKKY3N644",
      secretAccessKey: "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",
      region: "ap-northeast-1",
    });
  }

  setMyCount(newValue) {
    this.myCount$ = newValue;
    this.boolSubject.next(newValue);
  }
  getTotalItem() {
    return this.http.get(`http://localhost:8090/api/v1/cart/count/`);
  }

  getTotalItemAfterLogin() {
    return this.http.get(`http://localhost:8090/api/v1/cart/count/`).subscribe(
      res=>{
        this.setMyCount(res)
      }
    );
  }

  addToCart(songId, price, songName, userId,avatarImage,artistId) {
    return this.http.post("http://localhost:8090/api/v1/cart/addtocart", {
      userId: userId,
      price: price,
      songId: songId,
      songName: songName,
      avatar:avatarImage,
      artistId:artistId
    });
  }

  checkOwned(songId, userId) {
    return this.http.post("http://localhost:8090/api/v1/songs/check-own", {
      userId: userId,
      songId: songId,
    });
  }

  deleteCartItem(cartId) {
    return this.http.delete(
      `http://localhost:8090/api/v1/cart/delete/${cartId}`
    );
  }

  download(song) {
    let index = song.url.lastIndexOf("/");
    let keyname = song.url.substring(index+1);
    console.log(keyname)

    let params = {
      Bucket: "thanhproject",
      Key: keyname,
    };

    this.bucket
      .getObject(params, (err: any, data: any) => {
        if (err) {
          this.message.danger("Can't get this file");
        } else {
          // response of binary data
          // use your download function here
          var file = new File([data.Body], keyname, {
            type: "audio/mpeg",
          });
          return file;
        }
      })
      .on("httpDownloadProgress", (progress) => {
        // shows file download progress
      });
  }
}
