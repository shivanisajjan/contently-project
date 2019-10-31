import {Component, OnInit} from '@angular/core';
import {BookFetchService} from '../bookFetch.service';
import {Book} from "./book";
import {Router} from '@angular/router';
import {Commit} from "./commit";
import {AddNewSectionComponent} from "./add-new-section/add-new-section.component";
import {MatDialog} from "@angular/material/dialog";


// let jsPDF = require('jspdf');
@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  private load: boolean = false;
  private username: String;
  private userEmail: String;

  index: number = 2;
  content: string = "nothing";
  books: Book[] = [];

  abc: boolean;
  aa: boolean;
  red: String;
  selectedO: Number = 2;
  yy: String = "50px";
  showMe: Boolean;

  constructor(private bookFetch: BookFetchService,
              private router: Router,
              private dialog: MatDialog) {
  }


  ngOnInit() {
    this.username = this.bookFetch.getUsername();
    this.userEmail = this.bookFetch.getUserEmail();

    this.bookFetch.getAllFiles()
      .subscribe(
        (data) => {
          for (let i = 0; i < data.length; i++) {
            console.log('All Files: ', data[i].name);
            this.books.push(new Book(data[i].name, data.sha, ""));
          }
          this.load = true;
        },
        error => {

        });

    this.customS = [
      {id: 1, name: "10px"},
      {id: 2, name: "20px"},
      {id: 3, name: "50px"}
    ];

  }


  downloadPdf() {
    // let doc = new jsPDF();
    // doc.addHTML(document.getElementById("bob"), function() {
    //    doc.save("obrz.pdf");
    // });
  }


  modelChange(val: any) {
    // console.log(btoa("password"));
  }


  editFile(fileName: String) {
    console.log('editFile(): ', fileName);
    this.router.navigate(['/edit/' + fileName]).then();
  }

  addNewSection() {
    console.log('Add new Section');
    const dialogRef = this.dialog.open(AddNewSectionComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  createFile(fileName) {
    console.log('New File Create: ', fileName);
    let commit = new Commit(fileName, this.username, this.userEmail, "", "");
    let newBook = new Book(fileName, "", "");
    console.log('commit: ', commit);
    console.log('new book: ', newBook);
    this.bookFetch.createFile(fileName, commit)
      .subscribe(
        data => {
          console.log('Create file response from github [Data]: ', data);
        },
        error => {
          console.log('Create file response from github [Error]: ', error);
        }
      );
    this.books.push(newBook);
  }

  onElementDeleted(element) {
    // console.log("delete called");
    // let index = this.book.indexOf(element);
    // this.book.splice(index, 1);
  }

  getGit(name): Promise<Book> {
    return new Promise(
      resolve => {
        this.bookFetch.getGit(name)
          .subscribe(
            (data) => {
              // console.log("name: " + name);
              let currentBook = new Book(data.name, data.sha, atob(data.content));
              // console.log(currentBook);
              resolve(currentBook);
            });
      }
    );
  }
}
