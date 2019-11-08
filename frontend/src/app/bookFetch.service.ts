import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Commit} from "./book-create/commit";


@Injectable({
  providedIn: 'root'
})
export class BookFetchService {

  constructor(private http: HttpClient) {
  }

  // github authorization header
  private headers = {
    Authorization: 'Token 38082b67020bce12020e9587f5b0cae858228b0d'
  };

  // httpOption for github api request
  private httpOptions = {
    headers: this.headers
  };

  createRepo(repoName: String, description: String) {
    const postObject: any = {
      name: repoName,
      description,
      private: true,
      auto_init: true
    };
    console.log('Creating repo: ', repoName);
    return this.http.post<any>("https://api.github.com/user/repos", postObject, this.httpOptions);
  }

  // creates/modifies file: fileName
  createFile(fileName: String, commit: Commit): Observable<any> {
    console.log('create/modify: ', commit);
    const repoName = JSON.parse(localStorage.getItem('book')).id;
    return this.http.put<any>('https://api.github.com/repos/contently-books/' +
      repoName + '/contents/' + fileName, commit, this.httpOptions);
  }

  // get contents of the file : fileName
  getGit(repoName, fileName): Observable<any> {
    console.log('get contents of file: ', fileName);
    return this.http.get<any>('https://api.github.com/repos/contently-books/' +
      repoName + '/contents/' + fileName, this.httpOptions);
  }

  // returns all the files in specified github repository
  // getAllFiles(): Observable<any> {
  //   console.log('getAllFiles(): ');
  //   return this.http.get<any>('https://api.github.com/repos/contently-books/' +
  //     this.repository + "/contents", this.httpOptions);
  //
  // }

  getRecommendation(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Batman ' + localStorage.getItem('token')
      })
    };
    console.log('recommending..');
    return this.http.get<any>('http://localhost:8081/api/v1/books', httpOptions);
  }


}
