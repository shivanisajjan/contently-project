import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { interest } from '../interest';
import { genre } from '../genre';
import { profile } from '../profile';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { userReg } from '../userReg';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  private username;
  private gender = 'female';
  isLinear = false;
  public interestsBoolean = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  private genres : string[] = [];
  private allGenres : string[] = ['Horror','Thriller','Romance','Comedy'];
 
  private $profile = new profile();
  private $interest: interest;
  private $genre: genre;
  private updateStatus = false;
  private profileData;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredGenres: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput', {static: false}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _router: Router
    ) {
      // if (!localStorage.getItem('token')) {
      //   this._router.navigate(['/home']).then();
      // }
    }

  ngOnInit() {
    this.profileData = JSON.parse(localStorage.getItem('editProfile'));
    console.log(this.profileData);
    if(this.profileData){
      this.username = this.profileData.username;
      this.firstFormGroup = this._formBuilder.group({
      firstName:[this.profileData.firstName,Validators.required],
      lastName:[this.profileData.lastName],
      email:[this.profileData.email],
      contact:[this.profileData.phoneNumber],
      address1:[this.profileData.addressLine1],
      address2:[this.profileData.addressLine2],
      address3:[this.profileData.addressLine3],
      nationality: [this.profileData.nationality, Validators.required],
      gender: [this.profileData.gender, Validators.required],
      date: ['', Validators.required]    });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
       });
     } else {
      this.username = localStorage.getItem('username');
      this.firstFormGroup = this._formBuilder.group({
        firstName:[],
        lastName:[],
        email:[],
        contact:[],
        address1:[],
        address2:[],
        address3:[],
        nationality: ['', Validators.required],
        gender: ['', Validators.required],
        date: ['', Validators.required]    });
        this.secondFormGroup = this._formBuilder.group({
          secondCtrl: ['', Validators.required]
         });
   }

    this.$profile.interest = new Array();
    this.$interest = new interest();
    this.$interest.name = "Novel";
    this.$interest.genre = [];
    console.log(this.$interest.name);
    this.$profile.interest.push(this.$interest);

    this.filteredGenres = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((genre: string | null) => genre ? this._filter(genre) : this.allGenres.slice()));
  }

  addPersonalDetails(firstname, lastname, nationality, address1, address2, address3, email, contact, date){
    console.log(date)
    const regUser: userReg = new userReg();
    regUser.username = this.profileData.username;
    regUser.email = email;
    regUser.phoneNumber = contact;
    regUser.firstName = firstname;
    regUser.lastName = lastname;
    regUser.nationality = nationality;
    regUser.addressLine1 = address1;
    regUser.addressLine2 = address2;
    regUser.addressLine3 = address3;
    regUser.gender = this.gender;
    regUser.dob = date;
    this._loginService.updateUser(regUser).subscribe(result => {
      let returnUser = result;
      if (returnUser.id != null) {
        this.updateStatus = true;
      }
    });
    localStorage.removeItem('editProfile');
  }

  checkValue(event, check) {
    this.interestsBoolean = true;
    console.log(check);
    if (check == false) {
      if ((event == "Biography" || event == "Autobiography")) {

        this.$interest = new interest();
        this.$interest.name = event;
        this.$interest.genre = [];
        console.log(this.$interest.name);
        this.$profile.interest.push(this.$interest);

      } else {

        this.$genre = new genre();
        this.$genre.name = event;
        this.$profile.interest[0].genre.push(this.$genre);

      }
    } else {
      if (event == "Biography" || event == "Autobiography") {
        this.$interest = new interest();
        this.$interest.name = event;
        this.$interest.genre = [];
        let i;
        for (i = 1; i < this.$profile.interest.length; ++i) {
          if (this.$profile.interest[i].name == event) {
            let remove = this.$profile.interest.splice(i, 1);
            console.log(remove);
            break;
          }
        }
   

      } else {
        let i;
        for (i = 0; i < this.$profile.interest[0].genre.length; i++) {
          if (this.$profile.interest[0].genre[i].name == event) {
            let remove = this.$profile.interest[0].genre.splice(i, 1);
            console.log(remove);
            break;
          }
        }
      }
    }
    console.log(this.$profile);
  }

  saveInterests(){
    if (this.interestsBoolean) {
      this.$profile.username = this.username;
      this._loginService.saveInterests(this.$profile).subscribe();
      this._router.navigate(['/afterLogin']).then();
    }
  }

  // tslint:disable-next-line: no-shadowed-variable
  selectGenre( genre ) {
    console.log(genre.name);
    // for(let g of this.genres){
    //   if(g.name == genre.name){
    //     if(g.state == true){
    //       g.state = false;
    //     } else {
    //       g.state = true;
    //     }
    //     break;
    //   }
    // }
  }

  changeSelected(event, genre){
    console.log(event);
    console.log(genre);
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
    for (let g of this.genres){
        this.$genre = new genre();
        this.$genre.name = g;
        this.$profile.interest[0].genre.push(this.$genre);
    }
    console.log(this.$profile);
    if (this.interestsBoolean) {
      this.$profile.username = this.username;
      this._loginService.saveInterests(this.$profile).subscribe();
      this._router.navigate(['/afterLogin']).then();
    }

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allGenres.filter(genre => genre.toLowerCase().indexOf(filterValue) === 0);
  }

}
