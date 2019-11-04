import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Commit} from "./book-create/commit";


@Injectable({
  providedIn: 'root'
})
export class BookFetchService {

  // logged user's username
  private username: String = 'User Name';
  private userEmail: String = 'user.name@example.com';
  // logged user's JWT token
  public token: String;
  // current content's repository name
  public repository: String = 'new';
  public fileName: String;

  constructor(private http: HttpClient) {
  }

  // github authorization header
  private headers = {
    Authorization: 'Token 419eac07f5f53ff8ae8ef23a52aa828df0c59c2e'
  };

  // backend authorization header
  private headers1 = {
    Authorization: 'Batman ' + this.token
  };

  // httpOption for github api request
  private httpOptions = {
    headers: this.headers
  };

  // httpOption for backend api request
  private httpOptions1 = {
    headers: this.headers1
  };

  // setters and getters
  getUsername() {
    return this.username;
  }

  setUsername(username: String) {
    this.username = username;
  }

  getUserEmail() {
    return this.userEmail;
  }

  setUserEmail(userEmail: String) {
    this.username = userEmail;
  }

  setRepository(repoName: String) {
    this.repository = repoName;
  }

  // getBook(): Observable<any> {
  //   return this.http.get<any>("");
  // }
  //
  // addBook(bookObj): Observable<any> {
  //   console.log('obj: ', bookObj);
  //   return this.http.post<any>(this.url, bookObj, this.httpOptions);
  //
  // }
  //
  // addContent(contObj): Observable<any> {
  //   console.log('obj: ', contObj);
  //   return this.http.post<any>("http://localhost:8082/api/v1/save", contObj, this.httpOptions1);
  // }

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
  getGit(fileName: String): Observable<any> {
    console.log("get contents of file: ", fileName);
    return this.http.get<any>("https://api.github.com/repos/contently-books/" + this.repository + "/contents/" + fileName, this.httpOptions);

  }

  // returns all the files in specified github repository
  getAllFiles(): Observable<any> {
    console.log("getAllFiles(): ");
    return this.http.get<any>("https://api.github.com/repos/contently-books/" + this.repository + "/contents", this.httpOptions);

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
