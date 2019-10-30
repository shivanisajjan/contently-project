import {Component, HostListener, Inject} from "@angular/core";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "./login/login.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "contently";
  private showNavigationBarLinks: boolean = true;
  private TABLET=768;
  private username: String;
  private password: String;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog) {
    this.showNavigationBarLinks = window.innerWidth > this.TABLET;
  }

  @HostListener('window:resize', ['$event'])
  onWindowsResize(){
    this.showNavigationBarLinks = window.innerWidth > this.TABLET;
  }

  search() {
  }

  onLogin() {
    console.log('Login');
    const dialogRef = this.dialog.open(LoginComponent, );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

