import {Component, HostListener, Inject, OnInit} from "@angular/core";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from './login/login.component';
import {AuthService} from './auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'contently';
  private showNavigationBarLinks: boolean = true;
  private TABLET = 768;
  private loggedIn = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private dialog: MatDialog,
              private authService: AuthService,
              private router: Router) {
    this.showNavigationBarLinks = window.innerWidth > this.TABLET;
  }

  ngOnInit() {
    if (this.authService.isLoggedIn == true) {
      console.log('LOGGED IN');
      this.loggedIn = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowsResize() {
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
    console.log('LOGGED OUT');
    localStorage.clear();
    this.router.navigate(['/home']).then();
  }

  ifToken() {
    if(localStorage.getItem('token')) {
      return true;
    }
    else return false;
  }

  ifReader(){
    if(localStorage.getItem('role') == 'reader/author'){
      return true;
    } else {
      return false;
    }
  }

  goToDashboard(){
    this.router.navigate(['/dashboard']).then();
  }
}

