import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BookFetchService} from '../bookFetch.service';
import {NgForm} from '@angular/forms';
import {ContentService} from '../content.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.css']
})

export class ContentLayoutComponent implements OnInit {
  private genresList = ['horror', 'romance', 'thriller', 'crime', 'drama'];
  constructor(private http: HttpClient,
              private router: Router,
              private bookFetch: BookFetchService,
              private contentService: ContentService) {
  }

  ngOnInit() {
  }

  onSubmit(input: NgForm) {
    console.log(input.value);
    const genres = [];

    for (let i = 0; i < this.genresList.length; i++) {
      const genre = this.genresList[i];
      if (input.value[genre] === true) {
        genres.push(genre);
      }
    }
    const jsonObj: any = {
      title: input.value.title,
      description: input.value.desc,
      authorName: localStorage.getItem('username'),
      typeName: input.value.type,
      genres,
      createdAt: formatDate(new Date(), 'dd/MM/yyyy', 'en')
    };
    console.log('json', jsonObj);
    this.contentService.saveBooks(jsonObj)
      .subscribe(
        data => {
          console.log('Save book data:', data);
          const temp: any = data;
          this.bookFetch.createRepo(temp.id, temp.description)
            .subscribe(
              data2 => {
                console.log('Create Repo data: ', data2);
                localStorage.setItem('book', JSON.stringify(data));
                this.router.navigate(['/bookCreate']).then();
              },
              error2 => {
                console.log('Create Repo error', error2);
              }
            );
        },
        error => {
          console.log('Save book error:', error);
        }
      );
  }
}
