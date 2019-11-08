import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { interest } from '../interest';
import { genre } from '../genre';
import { profile } from '../profile';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { userReg } from '../userReg';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  private gender = 'female';
  isLinear = false;
  public interestsBoolean = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  private genres = ['Horror','Thriller','Romance','Comedy'];
  private $profile = new profile();
  private $interest: interest;
  private $genre: genre;
  private updateStatus = false;
  
  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _router: Router
    ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nationality: ['', Validators.required],
      gender: ['', Validators.required],
      date: ['', Validators.required]    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.$profile.interest = new Array();
    this.$interest = new interest();
    this.$interest.name = "Novel";
    this.$interest.genre = [];
    console.log(this.$interest.name);
    this.$profile.interest.push(this.$interest);
  }

  addPersonalDetails(firstname, lastname, nationality, address1, address2, address3, date){
    const regUser: userReg = new userReg();
    // regUser.username = username;
    // regUser.password = password;
    // regUser.email = email;
    // regUser.phoneNumber = contact;
    regUser.firstName = firstname;
    regUser.lastName = lastname;
    regUser.nationality = nationality;
    regUser.addressLine1 = address1;
    regUser.addressLine2 = address2;
    regUser.addressLine3 = address3;
    regUser.gender = this.gender;
    this._loginService.updateUser(regUser).subscribe(result => {
      let returnUser = result;
      if (returnUser.id != null) {
        this.updateStatus = true;
      }
    });
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

  saveInterests(username){
    if (this.interestsBoolean) {
      this.$profile.username = username;
      this._loginService.saveInterests(this.$profile).subscribe();
      this._router.navigate(['/home']).then();
    }
  }

}
