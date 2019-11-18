import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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
  // used to update item inside content
  saveContent(content) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Batman ' + localStorage.getItem('token')
      })
    };
    const postUrl = `http://13.126.150.171:8080/content-service/api/v1/update`;
    return this.http.put(postUrl, content, this.httpOptions);
  }

  getRecommendedEditorsOrIllustrators(role, genre) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Batman ' + localStorage.getItem('token')
      })
    };
    const postUrl = `http://13.126.150.171:8080/recommendation-service/api/v1/${role}/${genre}`;
    return this.http.get(postUrl, this.httpOptions);
  }

  updateEditorOrIllustratorStatus(id, role, status) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Batman ' + localStorage.getItem('token')
      })
    };
    const postUrl = `http://13.126.150.171:8080/content-service/api/v1/content/${id}/${role}/${status}`;
    return this.http.put(postUrl, this.httpOptions);
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

  // used get details of one content by id
  getBookDetails(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Batman ' + localStorage.getItem('token')
      })
    };
    console.log("in");
    const postUrl = `http://13.126.150.171:8080/content-service/api/v1/content/id/${id}`;
    return this.http.get(postUrl, httpOptions);
  }

  getPurchaseStatus(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Batman ' + localStorage.getItem('token')
      })
    };
    const postUrl = `http://13.126.150.171:8080/purchasing-service/api/v1/book/${id}/${localStorage.getItem('username')}`;
    return this.http.get(postUrl, httpOptions);
  }

  // used to get all contents of 'username'
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

  // used to save new content
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
  recommendedPrice(editorPay, illustratorPay) {
    const book = JSON.parse(localStorage.getItem('book'));
    const myObject = {
      genre: book.genres[0],
      editorPay,
      illustratorPay,
      base: 50,
      noOfWords: +localStorage.getItem('wordCount')
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Batman ' + localStorage.getItem('token')
      })
    };
    const postUrl = `http://13.126.150.171:8080/recommendation-service/api/v1/priceRec`;
    return this.http.post(postUrl, myObject, this.httpOptions);
  }

  getPay(editorName) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Batman ' + localStorage.getItem('token')
      })
    };
    const postUrl = `http://13.126.150.171:8080/profile-service/api/v1/profile/username/` + editorName;
    return this.http.get(postUrl, this.httpOptions);
  }

  getBookDetailPage(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Batman ' + localStorage.getItem('token')
      })
    };
    const postUrl = `http://13.126.150.171:8080/publication-service/api/v1/content/${id}`;
    return this.http.get(postUrl, httpOptions);
  }

  saveBookDetails(book) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Batman ' + localStorage.getItem('token')
      })
    };
    const postUrl = `http://13.126.150.171:8080/content-service/api/v1/update`;
    return this.http.put(postUrl, book, this.httpOptions);
  }
}
