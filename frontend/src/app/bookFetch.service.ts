import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
    let postObject: any = {
      name: repoName,
      description: description,
      private: true,
      auto_init: true
    };
    console.log('Creating repo: ', repoName);
    return this.http.post<any>("https://api.github.com/user/repos", postObject, this.httpOptions);
  }

  // creates/modifies file: fileName
  createFile(fileName: String, commit: Commit): Observable<any> {
    console.log('create/modify: ', commit);
    return this.http.put<any>("https://api.github.com/repos/contently-books/" + this.repository + "/contents/" + fileName, commit, this.httpOptions);
  }

  // get contents of the file : fileName
  getGit(repoName, fileName): Observable<any> {
    console.log('get contents of file: ', fileName);
    return this.http.get<any>('https://api.github.com/repos/contently-books/' + repoName + '/contents/' + fileName, this.httpOptions);
  }

  // returns all the files in specified github repository
  getAllFiles(): Observable<any> {
    console.log("getAllFiles(): ");
    return this.http.get<any>("https://api.github.com/repos/contently-books/" + this.repository + "/contents", this.httpOptions);

  }

  getRecommendation(): Observable<any> {
    console.log('recommending..');
    return this.http.get<any>("http://localhost:8081/api/v1/books", this.httpOptions1);


  }

  // delete a file
  // deleteFile(fileName: String, commit: Commit): Observable<any> {
  // console.log('delete: ', commit);
  // let commit2: any = {
  //   sha: commit.sha,
  //   message: 'msg'
  // };
  // let options: any = {
  //   headers: this.headers,
  //   sha: commit.sha,
  //   message: 'msg'
  // };
  // return this.http.delete("https://api.github.com/repos/contently-books/" + this.repository + "/contents/" + fileName, commit, this.httpOptions);
  // return this.http.request('delete',"https://api.github.com/repos/contently-books/"+this.repository+"/contents/"+fileName, options);
  // }


}
