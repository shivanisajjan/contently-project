import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
  };

  
@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http:HttpClient) { }

  getBooks(username){
    let post_url = `http://13.126.150.171:8080/content-service/api/v1/content/${username}`;
   return this.http.get(post_url,httpOptions);
  }
}
