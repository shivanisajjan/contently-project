import { Component, OnInit, Output } from '@angular/core';
import { LoginService } from '../login.service';
import { user } from '../user';
import { EventEmitter } from 'events';
import { Router } from '@angular/router';
import { userReg } from '../userReg';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  router: Router;
  public fail: Boolean;
  public getuser : userReg;
  public error;


  constructor(
     private _loginService: LoginService,_router: Router,
     public dialogRef: MatDialogRef<LoginComponent>,
     private _authService : AuthService
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
    //console.log('authenticate');
    const checkUser: user = new user();
    checkUser.username = username;
    checkUser.password = password;

  //   this._loginService.authenticateUser(checkUser).subscribe((result ) => {
  //     this.tokenObject = result;
  //     console.log(result.status);
  //     console.log(this.tokenObject.body.role);

  //     if(this.tokenObject.authResponse == "Username/Password is invalid"){
  //       this.fail = true;
  //     }else{
  //       console.log("AUTHENTICATION SUCCESSFUL")
  //       this._loginService.setJwtToken(this.tokenObject.authResponse);
  //       //console.log(this.tokenObject.authResponse);
  //       //console.log(this.tokenObject.role);
  //       this._loginService.setRole(this.tokenObject.role);
  //       this.router.navigate(['/dashboard']);
  //     }

  //   }
  //  );

   this._loginService.authenticateUser(checkUser).subscribe(
    // (result) => {
    //   console.log("AUTHENTICATION SUCCESSFUL")
    //   this.tokenObject = result;
    //   console.log(result.status);
    //   this.router.navigate(['/dashboard']);
    // },
    // (error) =>{
    //   this.error = error;
    //   console.log("AUTHENTICATION UNSUCCESSFUL");
    //   console.log(error.status);
    //   this.fail = true;
    // }

    result => {
      if(result.status == 202){
        console.log("AUTHENTICATION SUCCESSFUL")
        localStorage.setItem('token',result.body.authResponse);
        localStorage.setItem('role',result.body.role);
        localStorage.setItem('username',username);
        this.dialogRef.close();
        this._authService.setLoggedIn(true);
        this.router.navigate(['/dashboard']);
      } else {
        console.log("AUTHENTICATION UNSUCCESSFUL");
        this.fail = true;
      }
     }
   );

  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
