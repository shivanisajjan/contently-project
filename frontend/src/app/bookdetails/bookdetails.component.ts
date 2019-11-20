import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {ContentService} from '../content.service';
import {BookFetchService} from '../bookFetch.service';
import {FileSaverService} from 'ngx-filesaver';
import {PreviewComponent} from "../book-create/preview/preview.component";

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
  private releaseNext;
  private chapterIndex;
  private lastChapter;

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
          this.contentService.getChapterFromProfile(localStorage.getItem('username'), localStorage.getItem('bookId'))
            .subscribe(
              data => {
                console.log('Chapter data: ', data);
                this.releaseNext = data.releaseNext;
                if(data.chapterIndex === result.chapterName.length - 1){
                  this.lastChapter = true;
                  console.log('last chapter');
                }
                this.chapterIndex = data.chapterIndex;
                this.bookDetailsLoaded = true;
              },
              error => {
                console.log('Chapter error: ', error);
              }
            );
        },
        error => {
          console.log('error', error);
        }
      );
    this.contentService.getPurchaseStatus(localStorage.getItem('bookId'))
      .subscribe(
        data => {
          console.log('IsPurchased data:', data);
          this.hasPurchased = data;
          // this.hasPurchased = false;
        },
        error => {
          console.log('IsPurchased error', error);
        }
      );
    // this.contentService.getChapterFromProfile(localStorage.getItem('username'), localStorage.getItem('bookId'))
    //   .subscribe(
    //     data => {
    //       console.log('Chapter data: ', data);
    //       this.releaseNext = data.releaseNext;
    //       // if(data.chapterIndex === result.chapterName.length){
    //       //   this.lastChapter = true;
    //       //   console.log('last chapter');
    //       // }
    //       this.chapterIndex = data.chapterIndex-1;
    //       this.bookDetailsLoaded = true;
    //     },
    //     error => {
    //       console.log('Chapter error: ', error);
    //     }
    //   );

  }

  getHasPurchased(): boolean {
    return this.hasPurchased;
  }

  getReleaseNext(): boolean {
    return this.releaseNext;
  }

  getLastChapter(): boolean {
    return this.lastChapter;
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

  preview() {
    this.bookFetch.getGit(this.bookDetails.id, this.bookDetails.chapterName[this.chapterIndex])
      .subscribe(
        data => {
          const dialogRef = this.dialog.open(
            PreviewComponent,
            {
              data: atob(data.content),
              height: '80%',
              width: '80%'
            }
          );
        }
      );
  }

  requestNext() {
    this.contentService.requestChapterFromProfile(localStorage.getItem('username'), localStorage.getItem('bookId'))
      .subscribe(
        data => {
          console.log('Chapter data: ', data);
          this.releaseNext = data.releaseNext;
        },
        error => {
          console.log('Chapter error: ', error);
        }
      );
  }
}
