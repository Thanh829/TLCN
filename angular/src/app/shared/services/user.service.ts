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

  countArtist()
  {
    return this.http.get("http://localhost:8090/api/v1/artist/count-artist")
  }

  getPageArtist(page)
  {
    return this.http.get(`http://localhost:8090/api/v1/artist/list-artist?page=${page}`)
  }

  disableArtist(artistId)
  {
    return this.http.post("http://localhost:8090/api/v1/artist/disable",artistId)
  }
  
  enableArtist(artistId)
  {
    return this.http.post("http://localhost:8090/api/v1/artist/enable",artistId)
  }

  banSong(songId,artistName,songName)
  {
    return this.http.post("http://localhost:8090/api/v1/songs/ban-song",{
      songId:songId,
      artistName:artistName,
      songName:songName
    })
  }

  unBanSong(songId,artistName,songName)
  {
    return this.http.post("http://localhost:8090/api/v1/songs/unban-song",{
      songId:songId,
      artistName:artistName,
      songName:songName
    })
  }

}
