import {Component, OnInit} from '@angular/core';
import {BookFetchService} from '../bookFetch.service';
import {Router} from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-page-after-login',
  templateUrl: './page-after-login.component.html',
  styleUrls: ['./page-after-login.component.css']
})
export class PageAfterLoginComponent implements OnInit {
  public bookVar: [];
  public bookRec: [];
  public gotRecs: boolean;

  constructor(
    // tslint:disable-next-line: variable-name
    public _bookFetch: BookFetchService,
    public router: Router,
    public dialog: MatDialog,) {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/index']).then(
        () => {
          this.dialog.open(LoginComponent);
        }
      );
    }
  }

  ngOnInit() {
    this.gotRecs = false;
    this._bookFetch.getRecommendation()
      .subscribe(data => {
        console.log(data);
        this.bookVar = data;
      });
    this._bookFetch.getRecommendedBooks(localStorage.getItem('username')).subscribe(
      data => {
        this.bookRec = data;
        if (this.bookRec.length === 0) {
          this.gotRecs = false;
        }
      },
      error => {
        this.gotRecs = false;
      }
    );
  }

  bookDetails(id) {
    localStorage.setItem('bookId', id);
    this.router.navigate(['/book-details']).then();
  }

}
