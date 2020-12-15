import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  fadeTrigger,
  songCardTrigger,
} from "src/app/shared/animations/animations";
import { AuthService } from "src/app/shared/services/auth.service";
import { CartService } from "src/app/shared/services/cart.service";
import { PlaylistService } from "src/app/shared/services/playlist.service";

@Component({
  selector: "app-artist-page",
  templateUrl: "./artist-page.component.html",
  styleUrls: ["./artist-page.component.scss"],
  animations: [songCardTrigger, fadeTrigger],
})
export class ArtistPageComponent implements OnInit {
  logged: boolean = false;

  loading: boolean = false;
  nextPage: string = null;
  page: number;
  user: any = null;
  songs: any[] = [];
  time: number = 100;
  count: any;
  noPage: number;
  playlists: any


  constructor(
    private _auth: AuthService,
    private _http: HttpClient,
    private playlistService: PlaylistService,
    private cartService: CartService,
    private route: Router
  ) {
    this.logged = this._auth.isLogged();
  }

  ngOnInit() {
    console.log("user:" + this.user);
    this._auth.statusEmitter.subscribe((status) => {
      this.logged = status;
    });
    this.user = this._auth.getUser();
    this.getAllPlaylist()
    this._http
      .get("http://localhost:8090/api/v1/songs/count")
      .subscribe((res) => {
        this.count = res;
        if (this.count % 4 != 0) this.noPage = this.count / 4 + 1;
        this.page = 0;
        this.loadSong();
      });
  }

  loadSong() {
    this.loading = true;
    // Search
    this._http
      .get(`http://localhost:8090/api/v1/songs/all?page=${this.page}`)
      .subscribe(
        (res: any) => {
          this.user = null;
          let newSongs = res.map((s) => {
            s.path = s.url;
            return s;
          });

          // Stagger animation
          for (let i = 0; i < newSongs.length; i++) {
            setTimeout(() => {
              this.songs.push(newSongs[i]);
            }, i * this.time);
          }
        },
        (error) => {},
        () => {
          this.loading = false;
        }
      );
    this.page++;
  }
  setSong(list)
  {

    this.songs=list
    console.log(this.songs)

  }

  addToCart(song) {
    let userId;
    if (!this._auth.isLogged()) this.route.navigate(["/start/login"]);
    userId = this._auth.getUser().id;
    console.log(userId);
    this.cartService
      .addToCart(song.id, song.price, song.title, userId)
      .subscribe((res) => {
        this.cartService.setMyCount(res);
      });
  }

  addToPlaylist(song) {
    if (!this._auth.isLogged()) this.route.navigate(["/start/login"]);
    console.log(song);
    this.playlistService.setSong(song);
  }

  getAllPlaylist()
  {
    this.playlistService.getAllPlaylist(this._auth.artistUserId).subscribe(
      res=>{
          this.playlists=res
      }
    )
  }
}
