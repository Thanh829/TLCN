import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { songCardTrigger, fadeTrigger } from "../../shared/animations/animations";
import { IgxFilterOptions, IgxListComponent, IgxToastComponent } from "igniteui-angular";
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { femaleFNames, lastName, maleFNames, middleNames } from "./name";
import { CartService } from 'src/app/shared/services/cart.service';
import { MusicPlayerService } from 'src/app/shared/services/music-player.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [songCardTrigger, fadeTrigger]
})
export class CartComponent implements OnInit {
  public search: string;
  public data: any[] = [];
  get fo() {
      const _fo = new IgxFilterOptions();
      _fo.key = "name";
      _fo.inputValue = this.search;
      return _fo;
  }

  link :any
  loading: boolean = false;
  nextPage: string = null;
  page:number
  user: any = null;
  songs: any[] = [];
  time: number = 100;
  public payPalConfig?: IPayPalConfig;
  loginForm: FormGroup;
  isPlaying: boolean = false;
  playingSong: any = null;
  TotalCost:any=0



  @ViewChild("toast", { static: true })
  public toast: IgxToastComponent;
  @ViewChild("mainIgxList", { static: true })
  public list: IgxListComponent;

   
  constructor(private _auth: AuthService,
    private _http: HttpClient, 
    private cartService: CartService,
    private _player: MusicPlayerService,
    private paymentService: PaymentService) {
   
   }

  ngOnInit() {
    console.log("playing" + Date.now())
    this.loginForm = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]})
    });
    this.initConfig()
    this.page=0
    // const data = [];
    //     for (let i = 0; i < 100000; i++) {
    //         const item = this.generatePerson(i);
    //         data.push(item);
    //     }
    //     this.data = data;
    
    this.loadSong()
    this._player.playObserve.subscribe(play => {

      
      if(!this._player.playingSong) return;

      this.isPlaying = play;

    });
  }
    
//    // Playing song
//    this._player.songObserve.subscribe(this.getPlayingSong.bind(this));
//    this.getPlayingSong(this._player.playingSong)

//    // Play or Pause observer
//    this._player.playObserve.subscribe(play => {

     
//      if(!this.playingSong || this.playingSong.id != this.song.id) return;

//      this.isPlaying = play;

//    });
//  }
 playSong(item){

  let song;
  if(this._player.playingSong==null ||this._player.playingSong.id!=item.songId)
    this._http.get(`http://localhost:8090/api/v1/songs/${item.songId}`).subscribe(
      res=> {
        song=res
        
            
        console.log("pause 1")
          this._player.emitSong(song);
          this.isPlaying=true
      }
    )
  else
  if(this._player.playingSong && this._player.playingSong.id == item.songId){
          console.log("pause 2")
    if(this.isPlaying){
      console.log("pause")
      this._player.pause();
      this.isPlaying=false
    } else {
      this._player.play();
    }
    
  } 

   
   
 }
 
//  getPlayingSong(song){
//      if(song == null){
//        this.playingSong = null;
//        this.isPlaying = false;
//      } else {
//        this.playingSong = song;
//        this.isPlaying = this.playingSong.id == this.song.id;
//      }
//  }
  public toggleFavorite(contact: any) {
    contact.isFavorite = !contact.isFavorite;
}
private initConfig(): void {
  this.payPalConfig = {
  currency: 'EUR',
  clientId: 'sb',
  // createOrderOnClient: (data) => <ICreateOrderRequest>{
  //   intent: 'CAPTURE',
  //   purchase_units: [
  //     {
  //       amount: {
  //         currency_code: 'EUR',
  //         value: '9.99',
  //         breakdown: {
  //           item_total: {
  //             currency_code: 'EUR',
  //             value: '9.99'
  //           }
  //         }
  //       },
  //       items: [
  //         {
  //           name: 'Enterprise Subscription',
  //           quantity: '1',
  //           category: 'DIGITAL_GOODS',
  //           unit_amount: {
  //             currency_code: 'EUR',
  //             value: '9.99',
  //           },
  //         }
  //       ]
  //     }
  //   ]
  // },
  advanced: {
    commit: 'true'
  },
  style: {
    label: 'paypal',
    layout: 'vertical'
  },
  onApprove: (data, actions) => {
    console.log('onApprove - transaction was approved, but not authorized', data, actions);
    actions.order.get().then(details => {
      console.log('onApprove - you can get full order details inside onApprove: ', details);
    });
  },
  onClientAuthorization: (data) => {
    console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    
  },
  onCancel: (data, actions) => {
    console.log('OnCancel', data, actions);
  },
  onError: err => {
    console.log('OnError', err);
  },
  onClick: (data, actions) => {
   
    console.log('onClick', data, actions);
  },
};
}

// private generatePerson(index): object {
//   const item = new Person();
//   item.key = index;
//   const gender = index % 2 === 0 ? "M" : "F";
//   item.name = this.generateName(gender);
//   item.avatar = "https://www.infragistics.com/angular-demos/assets/images/" +
//       (gender === "M" ? "men" : "women") +
//       "/" + Math.floor((Math.random() * 100)) + ".jpg";
//   item.favorite = Math.floor((Math.random() * 3)) % 3 === 0;
//   return item;
// }
// private generateName(gender): string {
//   let name = "";
//   const fNames = gender === "M" ? maleFNames : femaleFNames;
//   name += fNames[Math.floor(Math.random() * fNames.length)] + " ";
//   name += middleNames[Math.floor(Math.random() * middleNames.length)] + " ";
//   name += lastName[Math.floor(Math.random() * lastName.length)];
//   return name;
// }

// public repopulateHandler() {
//     //this.contacts = Object.assign([], this.dataSource);
// }

checkout()
{
  this.paymentService.checkout("sb-43gsoj3559342@business.example.com",this.data,this.TotalCost,"USD","Paypal","sale","ban","http://localhost:4200/invoice").subscribe(
    res=>{
      this.link= res
      console.log(this.link.url)
      window.open (this.link.url.toString()),"_blank";
    }
  )
}

deleteCartItem(item)
{
  this.TotalCost-=item.price
  this.data.splice(this.data.indexOf(item),1)
  this.cartService.deleteCartItem(item.id).subscribe(
    res=>{
          this.cartService.setMyCount(this.data.length)
    }
  )
}


public get panThreshold() {
    const result = this.list.panEndTriggeringThreshold;
    return Math.round(result * 100) + "%";
}

  loadSong() {

    this.loading = true;
    console.log("page: "+this.page)
    // Search
    this._http
      .get(`http://localhost:8090/api/v1/cart/`)
      .subscribe(
        (res: any) => {
          
          this.user = null;
          let newSongs = res.map(s => {
            s.path = s.url;
            return s;
          });

          // Stagger animation
          for(let i = 0; i < newSongs.length; i++){
            setTimeout(()=>{
              this.data.push(newSongs[i]);
              this.TotalCost+=newSongs[i].price
            },i * this.time);
          }


        },
        error => {},
        () => {
          this.loading = false;
        }
      );
      this.page++
  }

}
export class Person {
  public key: number;
  public name: string;
  public favorite: boolean;
  public avatar: string;
}
