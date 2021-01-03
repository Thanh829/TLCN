import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MusicPlayerService } from "../../shared/services/music-player.service";
import { AuthService } from "../../shared/services/auth.service";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { MessagesService } from "src/app/shared/services/messages.service";
import { CartService } from "src/app/shared/services/cart.service";
import {
  config,
  SecretsManager,
  S3,
  CognitoIdentityCredentials,
} from "aws-sdk";

@Component({
  selector: "app-user-song-cart",
  templateUrl: "./user-song-cart.component.html",
  styleUrls: ["./user-song-cart.component.scss"],
})
export class UserSongCartComponent implements OnInit {
  @Input("song") song;
  @Input("user") user: any;
  @Output("deleted") deleted: EventEmitter<any> = new EventEmitter();
  @Output() songAddToCart: EventEmitter<any> = new EventEmitter<any>();
  @Output() songAddToPlaylist: EventEmitter<any> = new EventEmitter<any>();

  isOwner: boolean = false;
  isPlaying: boolean = false;
  playingSong: any = null;

  constructor(
    private _player: MusicPlayerService,
    private _auth: AuthService,
    private _http: HttpClient,
    private _msg: MessagesService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    if (this.user) {
      this.song.user = this.user;
    }

    // console.log(this._auth.getUser().id, this.song.user.id);
    //console.log(this._auth.isLogged());
    // if(this._auth.isLogged()){

    //   if(!this._auth.getUser()){
    //     let interval = setInterval(()=>{

    //       if(this._auth.getUser()){
    //         if(this._auth.user.id == this.song.user.id){
    //           this.isOwner = true;
    //         }
    //         clearInterval(interval);
    //       }
    //     }, 1000);
    //   } else {
    //     if(this._auth.user.id == this.song.user.id){
    //       this.isOwner = true;
    //     }

    //   }
    // }

    // Playing song
    this._player.songObserve.subscribe(this.getPlayingSong.bind(this));
    console.log("co toi day k");
    this.getPlayingSong(this._player.playingSong);

    // Play or Pause observer
    this._player.playObserve.subscribe((play) => {
      if (!this.playingSong || this.playingSong.id != this.song.id) return;

      this.isPlaying = play;
    });
  }

  playSong() {
    if (this.playingSong && this.playingSong.id == this.song.id) {
      if (this.isPlaying) {
        this._player.pause();
      } else {
        this._player.play();
      }
    } else {
      this._player.emitSong(this.song);
    }
  }

  getPlayingSong(song) {
    if (song == null) {
      this.playingSong = null;
      this.isPlaying = false;
    } else {
      this.playingSong = song;
      this.isPlaying = this.playingSong.id == this.song.id;
    }
  }

  addToCart() {
    this.songAddToCart.emit(this.song);
  }

  addToPlaylist() {
    this.songAddToPlaylist.emit(this.song);
  }

  download(song) {
    var FileSaver = require("file-saver");
    let index = song.url.lastIndexOf("/");
    let keyname = song.url.substring(index + 1);
    let params = {
      Bucket: "thanhproject",
      Key: keyname,
    };
    this.cartService.bucket
      .getObject(params, (err: any, data: any) => {
        if (err) {
          this._msg.danger("Can't get this file");
        } else {
          // response of binary data
          // use your download function here
          var file = new File([data.Body], keyname, {
            type: "audio/mpeg",
          });
          FileSaver.saveAs(file);
        }
      })
      .on("httpDownloadProgress", (progress) => {
        // shows file download progress
      });
  }

  

  // Delete the song
  delete() {
    if (!confirm(`Are you sure you want to delete "${this.song.name}"?`)) {
      return;
    }

    let token = this._auth.getToken();

    let headers = new HttpHeaders()
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token);

    this._http
      .delete(environment.url + "api/songs/" + this.song.id, {
        headers: headers,
      })
      .subscribe(
        () => {
          this.deleted.emit();

          this._msg.success(
            "Congratulations!",
            "Your song deleted successfully"
          );

          // Decrease number of songs
          this._auth.addSongNumber(-1);
        },
        () => {
          this._msg.danger(
            "Error!",
            "Check you internet connection or try latter"
          );
        },
        () => {}
      );
  }
}
