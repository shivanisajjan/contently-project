import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog , MAT_DIALOG_DATA} from '@angular/material';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {ContentService} from '../content.service';
import {BookFetchService} from '../bookFetch.service';
import {FileSaverService} from 'ngx-filesaver';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  private hasPurchased;
  private bookId;
  private bookDetails: any;
  private bookDetailsLoaded;
  private book;
  private checkPurchase;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private contentService: ContentService,
    private bookFetch: BookFetchService,
    public fileSaverService: FileSaverService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.contentService.getBookDetailPage(localStorage.getItem('bookId'))
      .subscribe(
        result => {
          this.bookDetails = result;
          console.log('book-details: ', this.bookDetails);
          this.bookDetailsLoaded = true;
        },
        error => {
          console.log('error', error);
        }
      );
    this.contentService.getPurchaseStatus(localStorage.getItem('bookId'))
      .subscribe(
        data => {
          console.log('IsPurchased data:', data);
          // this.hasPurchased = data;
          this.hasPurchased = false;
        },
        error => {
          console.log('IsPurchased error', error);
        }
      );
  }

  getHasPurchased(): boolean {
    return this.hasPurchased;
  }

  downloadPdf() {
    // const bookId = 'sample';
    const bookId = localStorage.getItem('bookId');
    const fileName = bookId + '.pdf';
    const fileType = this.fileSaverService.genType(fileName);
    console.log('book id is ' + bookId);
    this.bookFetch.getFromAws(fileName)
      .subscribe(
        data => {
          const blob = new Blob([data], {type: fileType});
          this.fileSaverService.save(blob, fileName);
        }
      );
  }

  goToPayment() {
    localStorage.setItem('price', this.bookDetails.price);
    this.router.navigate(['/pay']).then();
  }

  preview(){

  }
}
