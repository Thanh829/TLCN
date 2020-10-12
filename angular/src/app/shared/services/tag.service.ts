import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format } from 'url';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getALLTag(){
    return this.http.get<Tag[]>("http://localhost:8090/api/v1/tag/all");
  }

  addTag(title: any)
  {
    const form = new FormData();
    form.append("title",title)
    console.log(title)
    return this.http.post("http://localhost:8090/api/v1/tag/add",form);
  }
}


export class Tag {
  public id: number
  constructor(
 
    public title: string
  ){

  }
}
