import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { post } from 'selenium-webdriver/http';


@Injectable({
  providedIn: 'root'
})
export class BookFetchService {

 public username:String;
 public token:String;
 public repository:String;
 public fileName:String;



    constructor(private ht:HttpClient) { } 

    private headers = {

        Authorization: 'Token caf85ac13cc5c171ccecbda05f414df89681c550'
    
    };

    
    private headers1 = {

      Authorization: 'Batman ' + this.token 
  
  };
  

    private httpOptions = {
    
        headers : this.headers
    
    };

    private httpOptions1 = {
    
      headers : this.headers1
  
  };
    url = "https://api.github.com/user/repos";

    repo:String="";
    path:String="";
    fileurl:String="";


    getBook():Observable<any>
    {
      return this.ht.get<any>("");
    }

    addBook(bookObj):Observable<any>
    { 
        console.log('obj: ', bookObj);
    return this.ht.post<any>(this.url,bookObj, this.httpOptions); 
    
    }

    addContent(contObj):Observable<any> 
    {console.log('obj: ', contObj);


      return this.ht.post<any>("http://localhost:8082/api/v1/save",contObj, this.httpOptions1); 

    }


    createFile(bookObj):Observable<any>
    {
      this.repo=this.repository;
      this.path=this.fileName;
      console.log('obj: ', bookObj);
      return this.ht.put<any>("https://api.github.com/repos/contently-books/"+this.repo+"/contents/"+this.path,bookObj, this.httpOptions); 


    }

    getGit(name)
    {this.repo="mom";
      this.path=name;
      return this.ht.get<any>("https://api.github.com/repos/contently-books/"+this.repo+"/contents/"+this.path, this.httpOptions);

    }


 



}
