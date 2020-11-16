import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { songCardTrigger, fadeTrigger } from "../../../shared/animations/animations";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  animations: [songCardTrigger, fadeTrigger]
})
export class ProfileComponent implements OnInit {
  query: string = "";
  songs: any[] = [];
  
  user: any = null;

  loading: boolean = false;
  nextPage: string = null;
  page:number
  count: any

  time: number = 100;

  constructor(private _http: HttpClient, private _route: ActivatedRoute, private _router: Router) {}

  ngOnInit() {
    // Get the query
    //this.query = this._route.snapshot.paramMap.get("query");
    
    /*
    this._route.paramMap.subscribe(params => {
      this.query = params.get("query");
      this.nextPage = environment.url + "api/user/" + this.query;
      this.songs = [];
      this.search();
    });
    */
   this.page=0
   this._http.get("http://localhost:8090/api/v1/songs/count").subscribe(
     res=>{
       this.count=res
       if(this.count %4 !=0) this.count++
       
       this.loadSong();
     }
   )

    
  }

  search() {

    if(this.loading || this.nextPage == null) return;

    this.loading = true;
    
    // Search
    this._http
      .get(`http://localhost:8090/api/v1/songs/all?page=${this.page}`, {
        headers: new HttpHeaders().set("Accept", "application/json")
      })
      .subscribe(
        (res: any) => {
          this.nextPage = res.data.next_page_url;
          this.page++
          this.user = res.user;
          let newSongs = res.data.data.map(s => {
            s.path = environment.url + s.path;
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

  

  delete(index: number){
    this.songs.splice(index, 1);
  }

}
