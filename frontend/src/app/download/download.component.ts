import { Component, OnInit } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import { BookFetchService } from '../bookFetch.service';


@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  public test;
  public blob;

  constructor(private _fileSaverService: FileSaverService, private bookFetch: BookFetchService) { }

  ngOnInit() {
    this.test = localStorage.getItem('bookId');
  }


  download() {

  



    this.bookFetch.getFromAws(this.test)
      .subscribe(
        data => {
          console.log(data);
          this._fileSaverService.save(data, this.test);
        },
        error => {
          console.log(error);
        }
    );
  }
}
