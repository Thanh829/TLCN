import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { environment } from 'src/environments/environment';
import { songSearchCardTrigger } from 'src/app/shared/animations/animations';

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  animations: [songSearchCardTrigger]
})
export class SearchComponent implements OnInit {
  query: string = "";
  songs: any[] = [];
  id:string
  count:any;
  loading: boolean = false;
  nextPage: string | boolean = true;
  page:number=0
  sumPage:number
  noResutls: boolean = false;
  time: number = 100; 
  last: boolean = false;  // Last page on search


  constructor(private _http: HttpClient, private _route: ActivatedRoute) {}

  ngOnInit() {
    // Get the query
    this.query = this._route.snapshot.paramMap.get("query");
    this.id=this._route.snapshot.paramMap.get("id");
    this._route.paramMap.subscribe(params => {
      this.query = params.get("query");
      this.id=params.get("id");
      console.log("id ne: "+ this.id)
      this.nextPage = environment.url + "api/search/" + this.query;
      this.songs = [];
      this.noResutls = false;
      this.last = false;
      this._http.get(`http://localhost:8090/api/v1/songs/countbytag?tagId=${this.id}`).subscribe(
        res=>{
          this.count=res
          if(this.count % 4!=0) this.sumPage=this.count/4;
          console.log("count ne: "+ this.sumPage)
          this.page=0
          this.search();
     }
      )

    })

  }

  search() {

    //if(this.loading || this.nextPage == null) return;
    this.loading = true;
    // Search

    this._http
      .get(`http://localhost:8090/api/v1/songs/getAllByTag?page=${this.page}&tagId=${this.id}`, {
        headers: new HttpHeaders().set("Accept", "application/json")
      })
      .subscribe(
        (data: any) => {

          this.nextPage = data.next_page_url;

          console.log(data);

          let newSongs = data.map((s)=>{
            s.path = environment.url + s.path;
            return s;
          });

          // Stagger animation
          for(let i = 0; i < newSongs.length; i++){
            setTimeout(()=>{
              this.songs.push(newSongs[i]);
            },i * this.time);
          }
          this.page++
          if(this.page >=this.sumPage){
            this.last = true;
          
          }

          if(this.songs.length == 0){
            this.noResutls = true;
          }

        },
        (error) => {},
        () => {
          this.loading = false;
        }
        
      );
      
  }

  deleted(index: number){
    this.songs.splice(index, 1);
  }

}
