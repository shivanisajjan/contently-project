import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ContentService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Batman ' + localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient) {
  }

  getBooks() {
    const postUrl = `http://13.126.150.171:8080/content-service/api/v1/contents/${localStorage.getItem('username')}`;
    return this.http.get(postUrl, this.httpOptions);
  }

  saveBooks(jsonObj) {
    const postUrl = `http://13.126.150.171:8080/content-service/api/v1/content`;
    return this.http.post(postUrl, jsonObj, this.httpOptions);
  }

}
