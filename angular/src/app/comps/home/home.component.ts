import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { songCardTrigger, fadeTrigger } from "../../shared/animations/animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [songCardTrigger, fadeTrigger]
})
export class HomeComponent implements OnInit {

  logged: boolean = false;

  loading: boolean = false;
  nextPage: string = null;
  page:number
  user: any = null;
  songs: any[] = [];
  time: number = 100;
  count:any

  constructor(private _auth: AuthService,
    private _http: HttpClient, 
    private _route: ActivatedRoute, 
    private _router: Router,
    private cartService: CartService) {
    this.logged = this._auth.isLogged();
   }

  ngOnInit() {
    this._auth.statusEmitter.subscribe(status => {
      this.logged = status;
    });
    this._http.get("http://localhost:8090/api/v1/songs/count").subscribe(
     res=>{
       this.count=res
       if(this.count % 4!=0) this.count++
       this.page=0
       this.loadSong()
     }
   )
    
  }

  loadSong() {

    this.loading = true;
    console.log("page: "+this.page)
    // Search
    this._http
      .get(`http://localhost:8090/api/v1/songs/all?page=${this.page}`)
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
              this.songs.push(newSongs[i]);
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

  addToCart(song)
  {

    this.cartService.addToCart(song.id,song.price, song.title).subscribe(
      res=> {
          this.cartService.setMyCount(res)
          
      }
    )
  }

}
