import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userId:number;
  artistId:number;
  Payee: string;
  constructor(private http :HttpClient) { }

  getAllArtist()
  {
    return this.http.get("http://localhost:8090/api/v1/artist/all")
  }
  disableArtist(artistId)
  {
    return this.http.post("http://localhost:8090/api/v1/artist/disable",artistId)
  }
  
  

}
