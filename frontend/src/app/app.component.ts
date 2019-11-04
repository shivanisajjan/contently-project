import {Component, HostListener, Inject, OnInit} from "@angular/core";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from "@angular/material/dialog";
import {LoginComponent} from "./login/login.component";
import { AuthService } from './auth.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  
  title = "contently";
  private showNavigationBarLinks: boolean = true;
  private TABLET=768;
  private username: String;
  private password: String;
  private loggedIn = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog,private _authService : AuthService) {
    this.showNavigationBarLinks = window.innerWidth > this.TABLET;
  }

  ngOnInit(){
    if(this._authService.isLoggedIn == true){
      console.log("LOGGED IN");
      this.loggedIn = true;
    }
  }
  @HostListener('window:resize', ['$event'])
  onWindowsResize(){
    this.showNavigationBarLinks = window.innerWidth > this.TABLET;
  }

  search() {
  }

  onLogin() {
    console.log('Login');
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onLogout() {
    console.log("LOGGED OUT");
    this._authService.setLoggedIn(false);
    window.location.reload();
  }

}

