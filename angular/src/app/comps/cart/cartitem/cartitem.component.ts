import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { songCardTrigger, fadeTrigger } from "../../../shared/animations/animations";
import { IgxFilterOptions, IgxListComponent, IgxToastComponent } from "igniteui-angular";
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/shared/services/cart.service';
import { MusicPlayerService } from 'src/app/shared/services/music-player.service';
@Component({
  selector: 'app-cartitem',
  templateUrl: './cartitem.component.html',
  styleUrls: ['./cartitem.component.scss'],
  animations: [songCardTrigger, fadeTrigger]
})
export class CartitemComponent implements OnInit {
  public search: string;
  public data: any[] = [];
  get fo() {
      const _fo = new IgxFilterOptions();
      _fo.key = "name";
      _fo.inputValue = this.search;
      return _fo;
  }

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



  // @ViewChild("toast", { static: true })
  // public toast: IgxToastComponent;
  // @ViewChild("mainIgxList", { static: true })
   @Input("item") item;
  // public list: IgxListComponent;

   
  constructor(private _auth: AuthService,
    private _http: HttpClient, 
    private _route: ActivatedRoute, 
    private _router: Router,
    private cartService: CartService,
    private _player: MusicPlayerService) {
   
   }

  ngOnInit() {
   
  }
   // Playing song
//    this._player.songObserve.subscribe(this.getPlayingSong.bind(this));
//    this.getPlayingSong(this._player.playingSong)

//    // Play or Pause observer
//    this._player.playObserve.subscribe(play => {

     
//      if(!this.playingSong || this.playingSong.id != this.song.id) return;

//      this.isPlaying = play;

//    });
//  }
//  playSong(){

//    if(this.playingSong && this.playingSong.id == this.song.id){
     
//      if(this.isPlaying){
//        this._player.pause();
//      } else {
//        this._player.play();
//      }
     
//    } else {
//      this._player.emitSong(this.song);
//    }
   
//  }
 
//  getPlayingSong(song){
//      if(song == null){
//        this.playingSong = null;
//        this.isPlaying = false;
//      } else {
//        this.playingSong = song;
//        this.isPlaying = this.playingSong.id == this.song.id;
//      }
//  }
 




public repopulateHandler() {
    //this.contacts = Object.assign([], this.dataSource);
}

deleteCartItem(item)
{
  // this.data.splice(this.data.indexOf(item),1)
  // this.cartService.deleteCartItem(item.id).subscribe(
  //   res=>{

  //   }
  // )
}



 

}
export class Person {
  public key: number;
  public name: string;
  public favorite: boolean;
  public avatar: string;
}
