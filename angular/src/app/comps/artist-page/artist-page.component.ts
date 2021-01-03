import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
    private route: Router,
    private router: ActivatedRoute
  ) {
    this.logged = this._auth.isLogged();
  }

  ngOnInit() {
    let id = this.router.snapshot.paramMap.get("id");
   
    this._auth.statusEmitter.subscribe((status) => {
      this.logged = status;
    });
    this._http.get(`http://localhost:8090/api/v1/artist?id=${id}`).subscribe(
    res=>{
      this.user=res
      console.log(this.user)
      this.getAllPlaylist()
      this._http
        .get(`http://localhost:8090/api/v1/songs/count-artist-song?artistId=${this.user.id}`)
        .subscribe((res) => {
          console.log("res:"+res)
          this.count = res;
          this.noPage = this.count / 4 
          this.page = 0;
          this.loadSong();
        });
    }
                    
    )
    

  }

  loadSong() {
    this.loading = true;
    // Search
    this._http
      .get(`http://localhost:8090/api/v1/songs/getAllByArtist?page=${this.page}&artistId=${this.user.id}`)
      .subscribe(
        (res: any) => {
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
      .addToCart(song.id, song.price, song.title, userId,song.avatarImage,song.artistid)
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
    this.playlistService.getAllPlaylist(this.user.userId).subscribe(
      res=>{
          this.playlists=res
      }
    )
  }
}
