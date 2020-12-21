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
  
  enableArtist(artistId)
  {
    return this.http.post("http://localhost:8090/api/v1/artist/enable",artistId)
  }

  banSong(songId,artistId,songName)
  {
    return this.http.post("http://localhost:8090/api/v1/artist/ban-song",{
      songId:songId,
      artistId:artistId,
      songName:songName
    })
  }

}
