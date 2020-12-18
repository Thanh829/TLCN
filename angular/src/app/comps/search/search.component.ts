import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { songSearchCardTrigger } from "src/app/shared/animations/animations";
import { AuthService } from "src/app/shared/services/auth.service";
import { Route } from "@angular/compiler/src/core";
import { CartService } from "src/app/shared/services/cart.service";
import { PaymentService } from "src/app/shared/services/payment.service";
import { PlaylistService } from "src/app/shared/services/playlist.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  animations: [songSearchCardTrigger],
})
export class SearchComponent implements OnInit {
  query: string = "";
  songs: any[] = [];
  id: string;
  count: any;
  loading: boolean = false;
  nextPage: string | boolean = true;
  page: number = 0;
  sumPage: number;
  noResutls: boolean = false;
  time: number = 100;
  last: boolean = false; // Last page on search

  constructor(
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _auth: AuthService,
    private route: Router,
    private cartService: CartService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit() {
    // Get the query
    this.query = this._route.snapshot.paramMap.get("query");
    this.id = this._route.snapshot.paramMap.get("id");
    this._route.paramMap.subscribe((params) => {
      this.query = params.get("query");
      this.id = params.get("id");
      console.log("id ne: " + this.id);
      this.nextPage = environment.url + "api/search/" + this.query;
      this.songs = [];
      this.noResutls = false;
      this.last = true;
      if(this.id!="0")
      {
        console.log(this.id)
        console.log("id khac 0")
        this._http
        .get(`http://localhost:8090/api/v1/songs/countbytag?tagId=${this.id}`)
        .subscribe((res) => {
          this.count = res;
          if (this.count % 4 != 0) this.sumPage = this.count / 4;
          console.log("count ne: " + this.sumPage);
          this.page = 0;
          this.searchByTag();
          this.last = false;
        });
      }

      else if(this.id=="0"){
        
        console.log("id o quey"+this.id)
        this._http
        .get(`http://localhost:8090/api/v1/songs/countbyquery?query=${this.query}`)
        .subscribe((res) => {
          this.count = res;
          if (this.count % 4 != 0) this.sumPage = this.count / 4;
          console.log("count ne: " + this.sumPage);
          this.page = 0;
          this.searchByQuery();
          this.last = false;
        });
      }

    });
  }

  searchByTag() {
    //if(this.loading || this.nextPage == null) return;
    this.loading = true;
    // Search
    this._http
      .get(
        `http://localhost:8090/api/v1/songs/getAllByTag?page=${this.page}&tagId=${this.id}`,
        {
          headers: new HttpHeaders().set("Accept", "application/json"),
        }
      )
      .subscribe(
        (data: any) => {
          this.nextPage = data.next_page_url;
          console.log("asdajgsd")
          console.log(data);

          let newSongs = data.map((s) => {
            s.path = environment.url + s.path;
            return s;
          });

          // Stagger animation
          for (let i = 0; i < newSongs.length; i++) {
            setTimeout(() => {
              this.songs.push(newSongs[i]);
            }, i * this.time);
          }
          this.page++;
          if (this.page >= this.sumPage) {
            this.last = true;
            this.loading = false;
          }

          if (this.songs.length == 0) {
            this.noResutls = true;
          }
        },
        (error) => {},
        () => {
          this.loading = false;
        }
      );
  }


  searchByQuery() {
    //if(this.loading || this.nextPage == null) return;
    this.loading = true;
    if (this.page >= this.sumPage) {
      console.log("page:" +this.page)
      console.log("sum:" +this.sumPage)
      this.last = true;
      this.loading = false;
    }
    // Search
    this._http
      .get(
        `http://localhost:8090/api/v1/songs/search?page=${this.page}&query=${this.query}`,
        {
          headers: new HttpHeaders().set("Accept", "application/json"),
        }
      )
      .subscribe(
        (data: any) => {
          this.nextPage = data.next_page_url;
          
          console.log(data);

          let newSongs = data.map((s) => {
            s.path = environment.url + s.path;
            return s;
          });

          // Stagger animation
          for (let i = 0; i < newSongs.length; i++) {
            setTimeout(() => {
              this.songs.push(newSongs[i]);
            }, i * this.time);
          }
         
        
        

          if (this.songs.length == 0) {
            this.noResutls = true;
          }
        },
        (error) => {},
        () => {
          this.loading = false;
        }
      );
      this.page++;
  }


  deleted(index: number) {
    this.songs.splice(index, 1);
  }
  addToCart(song) {
    let userId;
    if (!this._auth.isLogged()) this.route.navigate(["/start/login"]);
    userId = this._auth.getUser().id;
    console.log(userId);
    this.cartService
      .addToCart(song.id, song.price, song.title, userId,song.avatarImage)
      .subscribe((res) => {
        this.cartService.setMyCount(res);
      });
  }

  addToPlaylist(song) {
    if (!this._auth.isLogged()) this.route.navigate(["/start/login"]);
    console.log(song);
    this.playlistService.setSong(song);
  }
}
