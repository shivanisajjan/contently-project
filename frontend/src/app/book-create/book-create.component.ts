import{Component, OnInit}from '@angular/core';
import {TextFieldModule}from '@angular/cdk/text-field';
import {customStyle} from "./customStyle"
import {BookFetchService }from '../bookFetch.service';
import{Book}from "./book";
import {Router}from '@angular/router';




// let jsPDF = require('jspdf');
@Component({
selector: 'app-book-create',
templateUrl: './book-create.component.html',
styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
public load:boolean = false;

constructor(private bookFetch:BookFetchService,private router: Router) {



      // setTimeout(() =>
      // {

      // },
      // 1000);



  }
  index:number = 2;
  content:string="nothing";
  book: Book[] = [
    // new Book('Introduction', 'DESC',this.index++),
    // new Book('Acknowledgement', 'DESC2',this.index++)
   ];


abc:boolean;
aa:boolean;
customS:customStyle[];
red:String;
selectedO:Number=2;
yy:String="50px";
showMe:Boolean;





  ngOnInit() {

    this.bookFetch.getAllFiles().
    subscribe(
      (data) =>{
        console.log(data);

      for(var i=0;i<data.length;i++)
      {
        this.book.push(new Book(data[i].name ,"no",this.index++))

        console.log(data[i].name);

        this.getGit(data[i].name);


      }

    this.load=true;});
    this.abc = false;
    this.aa=false;
    this.customS=[
      {id:1,name:"10px"},
      {id:2,name:"20px"},
      {id:3,name:"50px"}         //here

    ];

    // this.bookFetch.getAllFiles().
    // subscribe(
    //   (data) =>{
    //     console.log(data);

    //   for(var i=0;i<data.length;i++)
    //   {
    //     this.book.push(new Book(data[i].name ,"no",this.index++))

    //     console.log(data[i].name);
    //   }});

    //   for(var i=0;i<this.book.length;i++)
    //   {
    //     console.log(this.book[i].name);

    //     this.bookFetch.getGit(this.book[i].name).subscribe((data)=>{

    //       console.log("this"+this.book[i].name);
    //       document.getElementById(this.book[i].name).innerHTML=atob(data.content);

    //     });
    //   }



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
    this.bookFetch.fileName=name;
    console.log("filename="+this.bookFetch.fileName)
    this.bookobj={
      "message": name,
      "committer": {
        "name": "prakhar",
        "email": "prakhar.bajpai@cgi.com"
      },
      "content": "bXkgbmV3IGZpbGUgY29udGVudHM="

    };
    // this.bookFetch.createFile(this.bookobj,name).subscribe((data) =>{ console.log(data);})
    this.router.navigateByUrl('edit');

  }

  addRecord(nameGot) {

    this.book.push(new Book(nameGot , 'DESC',this.index++));
  }

  onElementDeleted(element) {
    console.log("delete called");
    let index = this.book.indexOf(element);
    this.book.splice(index, 1);
  }

  getGit(name)
  {
    console.log("name="+name);
    this.bookFetch.getGit(name)
    .subscribe(
      (data) =>{
        console.log(data);
        this.content=atob(data.content);
        document.getElementById(name).innerHTML=this.content
    });
  }

}
