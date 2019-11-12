import {Component, HostListener, Inject, OnInit} from "@angular/core";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from './login/login.component';
import {AuthService} from './auth.service';
import {Router} from "@angular/router";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';
import { MatSnackBar } from '@angular/material';
import { notification } from './notification';
import { NotificationService } from './notification.service';

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
  private serverUrl = 'http://localhost:8716/socket'
  private stompClient;
  private notificationList : any;
  private notificationCount;
  //private role=true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private dialog: MatDialog,
              private authService: AuthService,
              private router: Router,
              private _snackBar: MatSnackBar,
              private notificationService : NotificationService) {
    this.showNavigationBarLinks = window.innerWidth > this.TABLET;
  }

  ngOnInit() {
    if (this.authService.isLoggedIn == true) {
      console.log('LOGGED IN');
      this.loggedIn = true;
    }

    this.getNotifications();
  }

  @HostListener('window:resize', ['$event'])
  onWindowsResize() {
    this.showNavigationBarLinks = window.innerWidth > this.TABLET;
  }

  search() {
  }


  loadStripe() {
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }
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

  initializeWebSocketConnection()
  {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, (frame) => {
      that.stompClient.subscribe("/user/"+localStorage.getItem('username')+"/notif", (message) => {
        if(message.body) {
          console.log("New Notification");
          this._snackBar.open(message.body,"close", {
            duration: 2000,
          });
        }
      });
    });
  }


  getNotifications(){
    this.notificationService.getNotification(localStorage.getItem('username')).subscribe(
        result => {
          this.notificationList = result;
          this.notificationCount = Object.keys(this.notificationList).length;
        });
  }

  removeNewNotifications(){
    this.notificationCount = null;
  }

  isAuthor(){
    if(localStorage.getItem('role') == 'reader/author')
      return true;
    else
      return false;  
  }

  acceptRequest(){

  }

  deleteRequest(){

  }

  sendNotification(receiver,message){
    const newNotification: notification = new notification();
    newNotification.sender = localStorage.getItem('username');
    newNotification.receiver = receiver;
    newNotification.message = message; 
    // newNotification.status = true;
    this.notificationService.sendNotification(newNotification).subscribe();
  }
}

