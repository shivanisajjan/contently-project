import { Component, OnInit, Output } from '@angular/core';
import { LoginService } from '../login.service';
import { user } from '../user';
import { EventEmitter } from 'events';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  router: Router;
  public fail: Boolean;
  public getuser;

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
    console.log('authenticate');
    const checkUser: user = new user();
    checkUser.username = username;
    checkUser.password = password;

    this._loginService.authenticateUser(checkUser).subscribe(result => {
      this.tokenObject = result;
      if(this.tokenObject.message == "Username/Password is invalid"){
        this.fail = true;
      }else{
        this._loginService.setUsername(username);
        this._loginService.getUser(username).subscribe(user => this.getuser = user);
        if(this.getuser.role == "reader/author"){
            this.router.navigate(['/dashboard']);
        }else if(this.getuser.role == "editor"){
          this.router.navigate(['/editor-dashboard']);
        }else{
          this.router.navigate(['/illustrator-dashboard']);
        }
      }

    }
   );
  }

}
