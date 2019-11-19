import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog , MAT_DIALOG_DATA} from '@angular/material';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../content.service';
import { BookFetchService } from '../bookFetch.service';
import {FileSaverService} from 'ngx-filesaver';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  private hasPurchased = true;
  private bookId;
  private bookDetails: any;
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
        },
        error => {
          console.log('error', error);
        }
      );

    // this.book = this.route.snapshot.paramMap.get('id');
    // console.log(this.book);
    // this.contentService.getBookDetails(this.book).subscribe(
    //         result => {this.bookDetails = result;
    //         console.log(this.bookDetails);})
    // this.bookId = localStorage.getItem('bookId');
    // console.log("jhjghghloplop" + this.bookId);
    this.book = this.route.snapshot.paramMap.get('id');
    this.contentService.getBookDetails(this.book).subscribe(
              result => {this.bookDetails = result;
                         console.log(this.bookDetails); });

      // this.book = this.route.snapshot.paramMap.get('id');
      // console.log(this.book);
      // this.contentService.getBookDetails(this.book).subscribe(
      //         result => {this.bookDetails = result;
      //         console.log(this.bookDetails);})
    this.bookId = localStorage.getItem('bookId');
    // console.log('jhjghghloplop' + this.bookId);

  }
  isPurchase(): boolean {
    this.contentService.getPurchaseStatus(this.bookDetails.id).subscribe(result => {this.checkPurchase = result; });
    return this.checkPurchase;
  }

  purchase() {
        this.router.navigateByUrl(`/pay/${this.bookId}`);


  }


  openSampleChapterDialog(): void {

    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(SampleChapterDialog, {
      width: '80%',
      autoFocus: false,
      maxHeight: '90vh',
      data: {
        // tslint:disable-next-line: radix
        bookId: parseInt(this.route.snapshot.paramMap.get('id'))
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });

  }

  getBookDetails(id) {

    }

    downloadIt() {
    const fileName = `save.pdf`;
    const fileType = this.fileSaverService.genType(fileName);

    console.log('bookid is ' + this.bookId);
    this.bookFetch.getFromAws(this.bookId).subscribe(data => {
      const blob = new Blob([data], {type: fileType});
      this.fileSaverService.save(blob, this.bookId + '.pdf');



    });

    }

}
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'sample-chapter-dialog',
  templateUrl: 'sample-chapter-dialog.html',
  styleUrls: ['./bookdetails.component.css']
})
// tslint:disable-next-line: component-class-suffix
export class SampleChapterDialog implements OnInit {
  private sampleChapter;
  private bookDetails;
  constructor(
    public dialogRef: MatDialogRef<SampleChapterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line: variable-name
    private _contentService: ContentService,
    private bookFetch: BookFetchService) {}


  ngOnInit(): void {
      console.log('Fetching Sample Chapter of  ' + this.data.bookId);
      this.getSampleChapter();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getSampleChapter() {
    this.bookFetch.getGit(JSON.parse(localStorage.getItem('book')).id, JSON.parse(localStorage.getItem('book')).status[0].chapterName)
      .subscribe(
        result => this.sampleChapter = result
      );
  }

  getBookDetails(id) {
    this._contentService.getBookDetailPage(id).subscribe(
      result => this.bookDetails = result
    );
  }


}

