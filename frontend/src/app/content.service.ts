import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContentService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Batman ' + localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient) {
  }

  saveContent(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Batman ' + localStorage.getItem('token')
      })
    };
    const postUrl = `http://13.126.150.171:8080/content-service/api/v1/content/update`;
    return this.http.put(postUrl, content, this.httpOptions);
  }

  getEditorsOrIllustrators(role) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Batman ' + localStorage.getItem('token')
      })
    };
    const postUrl = `http://13.126.150.171:8080/user-management/api/v1/user/role/${role}`;
    return this.http.get(postUrl, this.httpOptions);
  }

  getBookDetails(name) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Batman ' + localStorage.getItem('token')
      })
    };
    const postUrl = `http://13.126.150.171:8080/content-service/api/v1/content/id/${name}`;
    return this.http.get(postUrl, this.httpOptions);
  }


  getBooks() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Batman ' + localStorage.getItem('token')
      })
    };
    const postUrl = `http://13.126.150.171:8080/content-service/api/v1/contents/${localStorage.getItem('username')}`;
    return this.http.get(postUrl, this.httpOptions);
  }

  saveBooks(jsonObj) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Batman ' + localStorage.getItem('token')
      })
    };
    const postUrl = `http://13.126.150.171:8080/content-service/api/v1/content`;
    return this.http.post(postUrl, jsonObj, httpOptions);
  }
}
