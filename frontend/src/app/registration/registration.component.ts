import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { userReg } from '../userReg';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { profile } from '../profile';
import { interest } from '../interest';
import { genre } from '../genre';
import { Router } from '@angular/router';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Novel',
    children: [
      {name: 'Thriller'},
      {name: 'Horror'},
      {name: 'Romance'},
    ]
  }, {
    name: 'Biography'
  },{
    name: 'Autobiography'
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public interestsBoolean = false;
  public registerv = false;
  public $profile = new profile();

  public $interest : interest;
  public $genre : genre;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  checkusername : string;
  matcher = new MyErrorStateMatcher();
  public remove;
  public gender = 'Female';
  
  
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private _loginService: LoginService,
    private _formBuilder: FormBuilder,
    private _router: Router
    ) {
      this.dataSource.data = TREE_DATA;

     }

     hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {
    this.registerv = false;
    this.firstFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      contact: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: [''],
    },{ validator: this.checkPasswords });
    this.secondFormGroup = this._formBuilder.group({
      nationality: ['', Validators.required],
      gender:['', Validators.required],
      date: ['', Validators.required]

    });

    this.$profile.interest = new Array();
    this.$interest = new interest();
    this.$interest.name = "Novel";
    this.$interest.genre = [];
    console.log(this.$interest.name);
    this.$profile.interest.push(this.$interest); 
  }

  public returnUser: any;

  public register(username, password, email, contact){
    const regUser: userReg = new userReg();
    regUser.username = username;
    regUser.password = password;
    regUser.email = email;
    regUser.phoneNumber = contact;
    console.log(regUser.username);
    this._loginService.registerUser(regUser).subscribe( result => {
      this.returnUser = result;
      if(this.returnUser.id != null){
        this.registerv = true;      }
      if(this.returnUser.message == "Username Already Exists"){
        
      }  
    });
  }

  public addPersonalDetails(username, password, email, contact,firstname, lastname, nationality, address1, address2, address3, date){
    const regUser: userReg = new userReg();
    regUser.username = username;
    regUser.password = password;
    regUser.email = email;
    regUser.phoneNumber = contact;
    regUser.firstName = firstname;
    regUser.lastName = lastname;
    regUser.nationality = nationality;
    regUser.addressLine1 = address1;
    regUser.addressLine2 = address2;
    regUser.addressLine3 = address3;
    regUser.gender = this.gender;
    this._loginService.updateUser(regUser).subscribe(result => {
      this.returnUser = result;
      if(this.returnUser.id != null){
        this.registerv = true;     
       }  
    });

  }

  checkValue(event,check){
    this.interestsBoolean = true;
    console.log(check);
    if(check == false){
    if((event == "Biography" || event == "Autobiography") ){
        
        this.$interest = new interest();
        this.$interest.name = event;
        this.$interest.genre = [];
        console.log(this.$interest.name);
        this.$profile.interest.push(this.$interest);

      }else{

        this.$genre = new genre();
        this.$genre.name = event;
        this.$profile.interest[0].genre.push(this.$genre);
        
      }
    }else{
      if(event == "Biography" || event == "Autobiography"){
        this.$interest = new interest();
        this.$interest.name = event;
        this.$interest.genre = [];
        let i;
        for( i = 1; i<this.$profile.interest.length ; ++i){
          if(this.$profile.interest[i].name == event){
            this.remove = this.$profile.interest.splice(i,1);
            console.log(this.remove);
            break;
          }
        }
        
      }else{
        let i;
        for( i = 0 ; i < this.$profile.interest[0].genre.length ; i++){
          if(this.$profile.interest[0].genre[i].name == event){
            this.remove = this.$profile.interest[0].genre.splice(i,1);
            console.log(this.remove);
            break;
          }
        }
      }
    }
     console.log(this.$profile);
 }

 saveInterests(username){
   if(this.interestsBoolean){
   this.$profile.username = username;
   this._loginService.saveInterests(this.$profile).subscribe();
   this._router.navigate(['/home']).then();
   }

  }
   checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }



 
}
