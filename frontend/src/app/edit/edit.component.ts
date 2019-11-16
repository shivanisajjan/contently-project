import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {GithubService} from '../github.service';
import {BookFetchService} from '../bookFetch.service';
import {Book} from '../book-create/book';
import {Commit} from '../book-create/commit';
import {formatDate} from '@angular/common';
import {NewIssueComponent} from './new-issue/new-issue.component';
import {MatDialog} from '@angular/material/dialog';
import {ReplyComponent} from "./reply/reply.component";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  private book: Book;
  private fileName: string;
  private editorForm: FormGroup;
  private editorStyle = {
    height: '400px',
    backgroundColor: 'white',
  };
  private issueFile: any;
  private issueList: Issue[] = [];
  private issuesLoaded = false;
  private replyDrawer = false;

  constructor(private service: GithubService,
              private router: Router,
              private bookFetch: BookFetchService,
              private route: ActivatedRoute,
              private dialog: MatDialog
  ) {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/home']).then();
    }
    this.route.params.subscribe(params => {
      this.fileName = params['fileName'];
    });
  }

  ngOnInit() {
    this.editorForm = new FormGroup({
      editor: new FormControl()
    });
    console.log('editing filename: ', this.fileName);
    this.bookFetch.getGit(JSON.parse(localStorage.getItem('book')).id, this.fileName)
      .subscribe(
        data => {
          this.book = new Book(data.name, data.sha, atob(data.content));
          console.log(this.book);
          this.editorForm = new FormGroup({
            editor: new FormControl(this.book.content)
          });
        }
      );

  }

  onSubmit() {
    console.log(this.editorForm.get('editor').value);
    let content = btoa(this.editorForm.get('editor').value);
    let commit = new Commit(formatDate(new Date(), 'dd/MM/yyyy HH:mm:ss', 'en'),
      localStorage.getItem('fullName'), localStorage.getItem('email'), this.book.sha, content);
    this.bookFetch.createFile(this.fileName, commit)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/bookCreate']).then();
        },
        error => {
          console.log(error);
        }
      );
  }

  back() {
    this.router.navigate(['/bookCreate']).then();
  }

  loadIssues() {
    this.issuesLoaded = false;
    this.bookFetch.getGit(JSON.parse(localStorage.getItem('book')).id,
      'chat-files/' + this.fileName)
      .subscribe(
        data => {
          this.issueFile = data;
          if (atob(data.content) !== '') {
            this.issueList = JSON.parse(atob(data.content));
          }
          this.issuesLoaded = true;
          console.log('Issues: ', data);
          console.log('Issue List: ', this.issueList);
        }
      );
  }

  newIssue() {
    const dialogRef = this.dialog.open(NewIssueComponent);
    dialogRef.afterClosed().subscribe(
      result => {
        if (result === undefined) {
          return;
        }
        const issue = new Issue(
          localStorage.getItem('username'), formatDate(new Date(), 'dd/MM/yyyy HH:mm:ss', 'en'),
          'open', result, []);
        console.log('Issues: ', this.issueList);
        this.issueList.push(issue);
        console.log('Issues: ', this.issueList);
        const commit = new Commit(formatDate(new Date(), 'dd/MM/yyyy HH:mm:ss', 'en'),
          localStorage.getItem('username'), localStorage.getItem('email'), this.issueFile.sha, btoa(JSON.stringify(this.issueList)));
        console.log('commit: ', commit);
        this.bookFetch.createFile('chat-files/' + this.fileName, commit)
          .subscribe(
            data => {
              console.log('Issue created data: ', data);
              this.loadIssues();
            }
          );
      }
    );
  }

  replyToIssue(i: number) {
    console.log('Reply to issue: ', i);
    this.dialog.open(ReplyComponent,
      {
        data: {
          file: this.issueFile,
          index: i
        },
        height: '80%',
        width: '80%'
      });
  }

  closeIssue(i: number) {
    console.log('Close issue: ', i);
    this.issueList[i].status = 'closed';
    const commit = new Commit(formatDate(new Date(), 'dd/MM/yyyy HH:mm:ss', 'en'),
      localStorage.getItem('username'), localStorage.getItem('email'), this.issueFile.sha, btoa(JSON.stringify(this.issueList)));
    console.log('commit: ', commit);
    this.bookFetch.createFile('chat-files/' + this.fileName, commit)
      .subscribe(
        data => {
          console.log('Issue closed data: ', data);
          this.loadIssues();
        }
      );
  }

  drawerOpen() {
    console.log('opened');
  }
}

export class Issue {
  public creator: string;
  public createdOn: string;
  public status: string;
  public title: string;
  public replies: Reply[];

  constructor(creator: string, createdOn: string, status: string, title: string, replies: Reply[]) {
    this.creator = creator;
    this.createdOn = createdOn;
    this.status = status;
    this.title = title;
    this.replies = replies;
  }
}

export class Reply {
  public commentator: string;
  public repliedOn: string;
  public message: string;

  constructor(commentator: string, repliedOn: string, message: string) {
    this.commentator = commentator;
    this.repliedOn = repliedOn;
    this.message = message;
  }
}
