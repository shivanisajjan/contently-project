import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../login.service';
import {ContentService} from '../content.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private profileData;
  private contentsList;
  private profileLoaded = false;
  private contentsLoaded = false;

  constructor(
    private router: Router,
    private login: LoginService,
    private contentService: ContentService) {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/home']).then();
    }
  }

  ngOnInit() {
    this.ifAuthor();
    this.login.getUser()
      .subscribe(
        data => {
          console.log('Profile data: ', data);
          this.profileData = data;
          this.profileLoaded = true;
        },
        error => {
          console.log('Profile error: ', error);
        }
      );
    this.contentService.getBooks()
      .subscribe(
        data => {
          console.log('Content All Books data: ', data);
          this.contentsList = data;
          this.contentsLoaded = true;
        },
        error => {
          console.log('Content All Books error: ', error);
        }
      );
  }

  edit(i: number) {
    console.log(this.contentsList[i]);
    localStorage.setItem('book', JSON.stringify(this.contentsList[i]));
    this.router.navigate(['/bookCreate']).then();
  }

  ifAuthor(): boolean {
    return localStorage.getItem('role') === 'reader/author';
  }
}
