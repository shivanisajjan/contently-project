import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {post} from 'selenium-webdriver/http';
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
  public repository: String = "blue";
  public fileName: String;




    constructor(private http:HttpClient) { } 

    
  
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
  url = "https://api.github.com/user/repos";

  repo: String = "";
  path: String = "";
  fileUrl: String = "";

  getUsername(){
    return this.username;
  }
  setUsername(username:String){
    this.username = username;
  }
  getUserEmail(){
    return this.userEmail;
  }
  setUserEmail(userEmail:String){
    this.username = userEmail;
  }

  getBook(): Observable<any> {
    return this.http.get<any>("");
  }

  addBook(bookObj): Observable<any> {
    console.log('obj: ', bookObj);
    return this.http.post<any>(this.url, bookObj, this.httpOptions);

  }

  addContent(contObj): Observable<any> {
    console.log('obj: ', contObj);
    return this.http.post<any>("http://localhost:8082/api/v1/save", contObj, this.httpOptions1);
  }


  createFile(fileName: String, commit: Commit): Observable<any> {
    console.log('obj: ', commit);
    return this.http.put<any>("https://api.github.com/repos/contently-books/" + this.repository + "/contents/" + fileName, commit, this.httpOptions);
  }

  getGit(fileName: String): Observable<any> {
    console.log("get file called");
    return this.http.get<any>("https://api.github.com/repos/contently-books/" + this.repository + "/contents/" + fileName, this.httpOptions);

  }

  // returns all the files in specified github repository
  getAllFiles(): Observable<any> {
    console.log("getAllFiles(): ");
    this.repo = this.repository;
    return this.http.get<any>("https://api.github.com/repos/contently-books/" + this.repo + "/contents", this.httpOptions);

  }


}
