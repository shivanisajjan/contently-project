import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog ,MAT_DIALOG_DATA} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../content.service';
import { BookFetchService } from '../bookFetch.service';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {

  private bookDetails: any;
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private contentService : ContentService
    ) {     
    }

  ngOnInit() {
    this.getBookDetails();
  }


  openSampleChapterDialog(): void{
   
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

  getBookDetails(){

  }

}



@Component({
  selector: 'sample-chapter-dialog',
  templateUrl: 'sample-chapter-dialog.html',
  styleUrls: ['./bookdetails.component.css']
})
export class SampleChapterDialog implements OnInit{
  private sampleChapter;
  private bookDetails;
  constructor(
    public dialogRef: MatDialogRef<SampleChapterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _contentService : ContentService,
    private bookFetch: BookFetchService) {}
    

  ngOnInit(): void {
      console.log("Fetching Sample Chapter of  " + this.data.bookId)
      this.getSampleChapter();
    }
      
  onNoClick(): void {
    this.dialogRef.close();
  }

  getSampleChapter(){
    this.bookFetch.getGit(JSON.parse(localStorage.getItem('book')).id, JSON.parse(localStorage.getItem('book')).status[0].chapterName)
      .subscribe(
        result => this.sampleChapter = result
      );
  }

  getBookDetails(id){
    this._contentService.getBookDetailPage(id).subscribe(
      result => this.bookDetails = result
    )
  }
}

