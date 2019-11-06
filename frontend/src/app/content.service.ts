import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class ContentService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Batman ' + localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient) {
  }

  getBooks() {
    let post_url = `http://13.126.150.171:8080/content-service/api/v1/contents/${localStorage.getItem('username')}`;
    return this.http.get(post_url, this.httpOptions);
  }

  saveBooks(jsonObj) {
    let post_url = `http://13.126.150.171:8080/content-service/api/v1/save`;
    return this.http.post(post_url, jsonObj, this.httpOptions);
  }

}
