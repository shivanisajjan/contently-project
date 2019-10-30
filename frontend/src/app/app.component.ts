import {Component, HostListener} from "@angular/core";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "contently";
  private showNavigationBarLinks: boolean = true;
  private TABLET=768;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver) {
    this.showNavigationBarLinks = window.innerWidth > this.TABLET;
  }

  @HostListener('window:resize', ['$event'])
  onWindowsResize(){
    this.showNavigationBarLinks = window.innerWidth > this.TABLET;
  }

  search() {

  }
}
