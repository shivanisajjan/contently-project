import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BookFetchService} from '../bookFetch.service';
import {FormControl, NgForm} from '@angular/forms';
import {ContentService} from '../content.service';
import {formatDate} from '@angular/common';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.css']
})

export class ContentLayoutComponent implements OnInit {
  // private genresList = ['horror', 'romance', 'thriller', 'crime', 'drama'];
  // private genres : string[] = [];
  // private allGenres : string[] = ['Horror','Thriller','Romance','Comedy'];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  fruitCtrl = new FormControl();
 

  @ViewChild('fruitInput', {static: false}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  
  private fictionGenres = ['classic', 'comic', 'contemporary', 'crime', 'detective', 'fable', 'fairy tale',
    'fan fiction', 'fantasy', 'folk tale', 'historical fiction', 'horror', 'humor', 'legend', 'magical realism',
    'meta fiction', 'mystery', 'mythology', 'mythopoeia', 'picture book', 'realistic fiction', 'romance', 'science fiction',
    'short story', 'suspense', 'swashbuckler', 'tall tale', 'theoretical fiction', 'thriller', 'western'];
  private nonFictionGenres = ['essay', 'journalism', 'lab report', 'memoir', 'narrative nonfiction',
    'owner\'s manual', 'personal narrative', 'reference book', 'speech', 'textbook', 'biography'];
  private genresSelected = [];
  private genresList = [];
  private separatorKeysCodes: number[] = [ENTER, COMMA];
  private filteredGenres: Observable<string[]>;
  private genreFormControl: FormControl;
  private typeSelected: any;

  @ViewChild('genreInput', {static: false}) genreInput: ElementRef<HTMLInputElement>;

  constructor(private http: HttpClient,
              private router: Router,
              private bookFetch: BookFetchService,
              private contentService: ContentService) {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/home']).then();
    }
    this.genreFormControl = new FormControl();
  }

  ngOnInit() {

    this.filteredGenres = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((genre: string | null) => genre ? this._filter(genre) : this.fictionGenres.slice()));
  }

  onSubmit(input: NgForm) {
    console.log(input.value);
    const jsonObj: any = {
      title: input.value.title,
      description: input.value.desc,
      authorName: localStorage.getItem('username'),
      typeName: input.value.type,
      genres : this.genresSelected,
      createdAt: formatDate(new Date(), 'dd/MM/yyyy HH:mm:ss', 'en'),
      selectHelper: input.value.selectHelper
    };
    localStorage.setItem('selectHelper', input.value.selectHelper);
    console.log('json', jsonObj);
    // this.contentService.saveBooks(jsonObj)
    //   .subscribe(
    //     data => {
    //       console.log('Save book data:', data);
    //       const temp: any = data;
    //       this.bookFetch.createRepo(temp.id, temp.description)
    //         .subscribe(
    //           data2 => {
    //             console.log('Create Repo data: ', data2);
    //             localStorage.setItem('book', JSON.stringify(data));
    //             this.router.navigate(['/bookCreate']).then();
    //           },
    //           error2 => {
    //             console.log('Create Repo error', error2);
    //           }
    //         );
    //     },
    //     error => {
    //       console.log('Save book error:', error);
    //     }
    //   );
  }

  removeGenre(genre: string) {
    const index = this.genresSelected.indexOf(genre);
    if (index >= 0) {
      this.genresSelected.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.genresSelected.push(event.option.viewValue.toLowerCase());
    this.genreInput.nativeElement.value = '';
    this.genreFormControl.setValue(null);
  }

  add(event: MatChipInputEvent) {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      // Add our fruit
      if ((value || '').trim()) {
        console.log('pushing:', value);
        this.genresSelected.push(value.trim().toLowerCase());
      }
      // Reset the input value
      if (input) {
        input.value = '';
      }
      this.genreFormControl.setValue(null);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.genresList.filter(genre => genre.toLowerCase().indexOf(filterValue) === 0);
  }

  typeChanged() {
    if (this.typeSelected === 'fiction') {
      this.genresList = this.fictionGenres;
    } else {
      this.genresList = this.nonFictionGenres;
    }
    this.filteredGenres = this.genreFormControl.valueChanges
      .pipe(
        startWith(null),
        map((genre: string | null) => genre ? this._filter(genre) : this.genresList.slice()));
  }

  // add(event: MatChipInputEvent): void {
  //   // Add fruit only when MatAutocomplete is not open
  //   // To make sure this does not conflict with OptionSelected Event
  //   if (!this.matAutocomplete.isOpen) {
  //     const input = event.input;
  //     const value = event.value;

  //     // Add our fruit
  //     if ((value || '').trim()) {
  //       this.genres.push(value.trim());
  //     }

  //     // Reset the input value
  //     if (input) {
  //       input.value = '';
  //     }

  //     this.fruitCtrl.setValue(null);
  //   }
  // }

  // remove(fruit: string): void {
  //   const index = this.genres.indexOf(fruit);

  //   if (index >= 0) {
  //     this.genres.splice(index, 1);
  //   }
  // }

  // selected(event: MatAutocompleteSelectedEvent): void {
  //   this.genres.push(event.option.viewValue);
  //   this.fruitInput.nativeElement.value = '';
  //   this.fruitCtrl.setValue(null);
  // }

  // saveGenre(){
  
  // }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.allGenres.filter(genre => genre.toLowerCase().indexOf(filterValue) === 0);
  // }

}
