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
  private booksList = [];
  private profileLoaded = false;
  private contentsLoaded = false;
  private booksLoaded = false;

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
          // // this chunk has to removed after publication service is ready
          // console.log(this.contentsList[0]);
          // this.booksList.push(
          //   {
          //     this.contentsList[0],
          //     noOfPurchases: 23,
          //   }
          // );
          // console.log('books', this.booksList[0]);
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

  editProfile(){
    localStorage.setItem('editProfile',JSON.stringify(this.profileData));
    this.router.navigate(['/editProfile']);
  }
}
