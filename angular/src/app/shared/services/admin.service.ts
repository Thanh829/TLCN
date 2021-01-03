import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getRevenue(year)
  {
    return this.http.get(`http://localhost:8090/api/v1/admin/revenue?year=${year}`)
  }
  countBannedSong()
  {
    return this.http.get("http://localhost:8090/api/v1/songs/banned")
  }
}
