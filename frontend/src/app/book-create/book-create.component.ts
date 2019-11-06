import {Component, OnInit} from '@angular/core';
import {BookFetchService} from '../bookFetch.service';
import {Book} from "./book";
import {Router} from '@angular/router';
import {Commit} from "./commit";
import {AddNewSectionComponent} from "./add-new-section/add-new-section.component";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PreviewComponent} from "./preview/preview.component";


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
  private books: Book[] = [];

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
        }
      );
  }

  downloadPdf() {
    // let doc = new jsPDF();
    // doc.addHTML(document.getElementById("bob"), function() {
    //    doc.save("obrz.pdf");
    // });
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
      console.log('New Section Name: ', result);
      let commit = new Commit("", this.bookFetch.getUsername(), this.bookFetch.getUserEmail(), "", "");
      this.bookFetch.createFile(result, commit)
        .subscribe(
          data => {
            console.log(data);
            this.books.push(new Book(result, "", ""));
          },
          error => {
            console.log(error);
          }
        );
    });
  }

  preview(sectionName: String) {
    this.bookFetch.getGit(sectionName)
      .subscribe(
        data => {
          console.log(data);
          let content = atob(data.content);
          const dialogRef = this.dialog.open(
            PreviewComponent,
            {
              data: content,
              height: '80%',
              width: '80%'
            }
          );
        },
        error => {

        }
      );
  }

  delete(sectionName: String) {
    this.bookFetch.getGit(sectionName)
      .subscribe(
        data => {
          console.log(data);
          let commit = new Commit('', this.bookFetch.getUsername(), this.bookFetch.getUserEmail(), data.sha, '');
          // this.bookFetch.deleteFile(sectionName, commit)
          //   .subscribe(
          //     data => {
          //       console.log('data', data);
          //     },
          //     error => {
          //       console.log('error', error);
          //     }
          //   );
        }
      );
  }
}
