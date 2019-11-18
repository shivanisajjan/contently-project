import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BookFetchService} from '../bookFetch.service';
import {NgForm, FormControl} from '@angular/forms';
import {ContentService} from '../content.service';
import {formatDate} from '@angular/common';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.css']
})

export class ContentLayoutComponent implements OnInit {
  private genresList = ['horror', 'romance', 'thriller', 'crime', 'drama'];
  private genres : string[] = [];
  private allGenres : string[] = ['Horror','Thriller','Romance','Comedy'];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredGenres: Observable<string[]>;

  @ViewChild('fruitInput', {static: false}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  
  constructor(private http: HttpClient,
              private router: Router,
              private bookFetch: BookFetchService,
              private contentService: ContentService) {
                if (!localStorage.getItem('token')) {
                  this.router.navigate(['/home']).then();
                }
            }

  ngOnInit() {


    this.filteredGenres = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((genre: string | null) => genre ? this._filter(genre) : this.allGenres.slice()));
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
      genres : this.genres,
      createdAt: formatDate(new Date(), 'dd/MM/yyyy HH:mm:ss', 'en'),
      selectHelper:input.value.selectHelper
    };
    localStorage.setItem('selectHelper',input.value.selectHelper);
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

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.genres.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.genres.indexOf(fruit);

    if (index >= 0) {
      this.genres.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.genres.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  saveGenre(){
  
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allGenres.filter(genre => genre.toLowerCase().indexOf(filterValue) === 0);
  }

}
