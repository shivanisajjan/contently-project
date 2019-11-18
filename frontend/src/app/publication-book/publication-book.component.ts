import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { ContentService } from '../content.service';
import { BookFetchService } from '../bookFetch.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

>>>>>>> 8246e168a43beeb30867914e97dec9796b9d1a33

@Component({
  selector: 'app-publication-book',
  templateUrl: './publication-book.component.html',
  styleUrls: ['./publication-book.component.css']
})
export class PublicationBookComponent implements OnInit {

  private recommended_price;
  private editorPay;
  private illustratorPay;
  private book;
  constructor(private contentService: ContentService, private bookFetch: BookFetchService, private router: Router,
    public dialogRef: MatDialogRef<PublicationBookComponent>
  ) { }

  ngOnInit() {
    this.book = JSON.parse(localStorage.getItem('book'));
    console.log('hello:', this.book);
    console.log(this.book.editorName);
    this.contentService.getPay(this.book.editorName)
      .subscribe(
        result => {
          this.editorPay = result;
        }
      );
    this.contentService.getPay(this.book.designerName)
      .subscribe(
        result => {
          this.illustratorPay = result;
        }
      );
    this.contentService.recommendedPrice(this.book.editorPay, this.book.illustratorPay)
      .subscribe(
        result => {
          this.recommended_price = result;
          console.log('result', result);
        }
      );
  }

  savePublication(price) {
    this.book.price = price;
    console.log('hello:', this.book);

    this.bookFetch.saveToPublication(this.book).subscribe(
      data => {
        console.log(data);
        this.bookFetch.deleteContent(this.book.id)
          .subscribe(
            data => {
              this.dialogRef.close();
            }
          );
      }
    );
    
  }

}
