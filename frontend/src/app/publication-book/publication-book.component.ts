import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service';

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
  constructor(private contentService: ContentService,
  ) { }

  ngOnInit() {
    this.book = JSON.parse(localStorage.getItem('book'));
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

}
