import { Component, OnInit, Output } from '@angular/core';
import { LoginService } from '../login.service';
import { user } from '../user';
import { EventEmitter } from 'events';
import { Router } from '@angular/router';
import { userReg } from '../userReg';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  router: Router;
  public fail: Boolean;
  public getuser : userReg;

  constructor(
     private _loginService: LoginService,_router: Router
    ) { 
      this.router = _router;
    }

  ngOnInit() {
    this.fail = false;
  }

  public tokenObject:any;

 // @Output
 //public event = new EventEmitter();


  public authenticate(username, password){
    const checkUser: user = new user();
    checkUser.username = username;
    checkUser.password = password;
    
    this._loginService.authenticateUser(checkUser).subscribe(result => {
      this.tokenObject = result;
      console.log(this.tokenObject.authResponse);

      if(this.tokenObject.authResponse == "Username/Password is invalid"){
        this.fail = true;
      }else{
        console.log("AUTHENTICATION SUCCESSFUL")
        this._loginService.setJwtToken(this.tokenObject.authResponse);
        //console.log(this.tokenObject.authResponse);
        //console.log(this.tokenObject.role);
        this._loginService.setRole(this.tokenObject.role);
        this.router.navigate(['/dashboard']);
      }

    }
   );  
  }

}
