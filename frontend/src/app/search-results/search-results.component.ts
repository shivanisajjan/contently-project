import { Component, OnInit , Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BookFetchService} from '../bookFetch.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  private search;
  private searchBooks: any;
  constructor(
    private route: ActivatedRoute, private bookFetch: BookFetchService, private router: Router
  ) { }

  ngOnInit() {
    this.search = this.route.snapshot.paramMap.get('search');
    this.bookFetch.searchBooks(this.search).subscribe(result => {
      this.searchBooks = result;
       });
    console.log(this.searchBooks);
  }
    bookDetails(id) {
      this.router.navigate(['/book-details', id]);
    }

}
