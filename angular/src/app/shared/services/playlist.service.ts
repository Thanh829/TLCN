import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  song:Subject<any> = new Subject<any>();
  constructor(private http:HttpClient) { }

  getAllPlaylist(userId)
  {
    return this.http.get(`http://localhost:8090/api/v1/playlist/getAll?userId=${userId}`)
  }
  createPlaylist(playlistName,userId)
  {
      return this.http.post(`http://localhost:8090/api/v1/playlist/create`,{
        name:playlistName,
        userId:userId
      })
  }

  setSong(song)
  {
      this.song.next(song)
  }

  addSongToPlayList(playlistId,song)
  {
    return this.http.put(`http://localhost:8090/api/v1/playlist/addtoplaylist`,{
      playlistId:playlistId,
      song:song
    })
  }

}
