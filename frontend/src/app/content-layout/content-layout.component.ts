import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { BookFetchService } from '../bookFetch.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.css']
})
export class ContentLayoutComponent implements OnInit {
  constructor(private http:HttpClient,private router: Router,private bookFetch:BookFetchService) { }

  selectedFile:File=null;
  public data; 
  public bookData:Number;
  

  ngOnInit() {
  }
  

  onFileSelected(event)
  {
    console.log(event);
    this.selectedFile=<File>event.target.files[0];
  }

  uploadImage()
  {
const temp=new FormData();
temp.append('image',this.selectedFile,this.selectedFile.name);
this.http.post('url',temp).subscribe(res=>{console.log(res);})

  }
  bookobj:any;
  contobj:any;

  someFunc(title,desc,grouptype,groupgenre,grouptarget)
  {
    this.bookFetch.repository=title; 
    console.log("repo="+this.bookFetch.repository);
    this.bookobj={
      "name":title,
      "description":desc,
      "private":true
    };

 

    this.bookFetch.addBook(this.bookobj).subscribe((data) =>{ console.log(data);}); 



    this.contobj={
      "title":title,
      "description":desc,
      "grouptype":grouptype,
      "groupgenre":groupgenre,
      "grouptarget":grouptarget,
      // "gitUrl":this.data 
    };

    this.bookFetch.addContent(this.contobj).subscribe((data) =>{ console.log(data.id);}); 

    this.router.navigateByUrl('bookCreate'); 
  }

  
  
  

}
