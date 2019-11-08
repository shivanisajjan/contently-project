import { Component, OnInit } from '@angular/core';
import {BookFetchService} from '../bookFetch.service';

@Component({
  selector: 'app-page-after-login',
  templateUrl: './page-after-login.component.html',
  styleUrls: ['./page-after-login.component.css']
})
export class PageAfterLoginComponent implements OnInit {
  public bookVar:[];
  constructor(private _bookFetch :BookFetchService ) { }

  ngOnInit() {
    this._bookFetch.getRecommendation()
    .subscribe(data => {console.log(data) ;this.bookVar=data;}); 
  }

}
