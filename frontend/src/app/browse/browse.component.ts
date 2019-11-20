import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ContentService} from "../content.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  private pageEvent: PageEvent = new PageEvent();
  private size = 20;
  private books = [];
  private booksLoaded;
  private bookData: any;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(private contentService: ContentService,
              private router: Router) {
  }

  ngOnInit() {
    this.contentService.getAllPublishedBooks()
      .subscribe(
        data => {
          console.log('all books data:', data);
          this.books = data;
          this.bookData = this.books.slice(0, 20);
          this.booksLoaded = true;
        },
        error => {
          console.log('all books error  :', error);
        }
      );
  }

  bookDetails(bookId: any) {
    localStorage.setItem('bookId', bookId);
    this.router.navigate(['book-details']).then();
  }

  pageChanged(event: PageEvent) {
    console.log('event: ', event);
    const start = event.pageIndex * event.pageSize;
    let end = start + event.pageSize;
    if(end > event.length){
      end = event.length - 1;
    }
    console.log(start, end);
    this.bookData = this.books.slice(start, end);
    console.log(this.bookData);
    return event;
  }

  getBookData(){
    return this.bookData;
  }
}
