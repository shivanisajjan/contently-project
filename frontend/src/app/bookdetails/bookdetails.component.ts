import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../content.service';
import { BookFetchService } from '../bookFetch.service';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  private bookId; s
  private bookDetails: any;
  private book;
  private checkPurchase;
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private contentService: ContentService,
    private bookFetch: BookFetchService,
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

  }
  isPurchase(): boolean {
    this.contentService.getPurchaseStatus(this.bookDetails.id).subscribe(result => { this.checkPurchase = result; });
    return this.checkPurchase;
  }

  purchase() {
    this.router.navigate(['/pay']);
  }


  openSampleChapterDialog(): void {

    const dialogRef = this.dialog.open(SampleChapterDialog, {
      width: '80%',
      autoFocus: false,
      maxHeight: '90vh',
      data: {
        bookId: parseInt(this.route.snapshot.paramMap.get('id'))
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });

  }

  getBookDetails(id) {

  }

}
@Component({
  selector: 'sample-chapter-dialog',
  templateUrl: 'sample-chapter-dialog.html',
  styleUrls: ['./bookdetails.component.css']
})
export class SampleChapterDialog implements OnInit {
  private sampleChapter;
  private bookDetails;
  constructor(
    public dialogRef: MatDialogRef<SampleChapterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _contentService: ContentService,
    private bookFetch: BookFetchService) { }


  ngOnInit(): void {
    console.log("Fetching Sample Chapter of  " + this.data.bookId)
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
    )
  }
}

