import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  nextPage: string = null;
  loading: boolean = false;
  first: boolean = true;
  count:any
  page:number

  constructor(private _http: HttpClient) {}

  ngOnInit() {
   
    this.page=0
    this._http.get(`http://localhost:8090/api/v1/artist/count-active-artist`).subscribe(
      res=>{
        this.count=res
        if(this.count %4 !=0) this.count++
        
        this.getUsers();
      }
    )
    this.loading=true
  }

  getUsers() {

    // if (this.nextPage == null && !this.first) return;
    
    let url =  environment.url + `api/v1/artist/all-artist?page=${this.page}`;
    
    let headers = new HttpHeaders().set("Accept", "application/json");

    this.loading = true;
    if(this.page>=this.count) this.loading=false
    
    this._http.get(url).subscribe(
      (data: any) => {
        let newUsers = data.map(u => {
          return u;
        });
        this.users.push(...newUsers);
      },
      error => {
        console.table(error);
      },
      () => {
        this.loading = false;
      }
    );

    this.page++

    this.first = false;
  }
}
