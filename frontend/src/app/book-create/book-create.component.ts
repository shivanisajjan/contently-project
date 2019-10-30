import { Component, OnInit } from '@angular/core';
import {TextFieldModule} from '@angular/cdk/text-field';
import {customStyle} from "./customStyle"
import { BookFetchService } from '../bookFetch.service';
import{Book} from "./book";




// let jsPDF = require('jspdf');
@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  constructor(private bookFetch:BookFetchService) { 
   
  }
  index:number = 2;
  book: Book[] = [
    new Book('Introduction', 'DESC',this.index++),
    new Book('Acknowledgement', 'DESC2',this.index++)
   ];


abc:boolean;
aa:boolean;
customS:customStyle[];
red:String;
selectedO:Number=2;
yy:String="50px";
showMe:String;



  
  ngOnInit() {
    this.abc = false;
    this.aa=false;
    this.customS=[
      {id:1,name:"10px"}, 
      {id:2,name:"20px"},
      {id:3,name:"50px"}

    ];
    
  }
  

  
   

  
downloadPdf() {
  // let doc = new jsPDF();
  // doc.addHTML(document.getElementById("bob"), function() {
  //    doc.save("obrz.pdf");
  // });
}



modelChange(val:any)
{
console.log(btoa("password"));
}
bookobj:any;

createFile(name)
  {
    this.bookobj={
      "message": name,
      "committer": {
        "name": "prakhar",
        "email": "prakhar.bajpai@cgi.com"
      },
      "content": "bXkgbmV3IGZpbGUgY29udGVudHM="

    };
    this.bookFetch.createFile(this.bookobj,name).subscribe((data) =>{ console.log(data);})
    
  }

  addRecord(nameGot) {
  
    this.book.push(new Book(nameGot , 'DESC',this.index++));
  }

  onElementDeleted(element) {
    console.log("delete called");
    let index = this.book.indexOf(element);
    this.book.splice(index, 1);
  }

}
