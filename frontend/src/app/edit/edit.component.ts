import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {GithubService} from "../github.service";
import {BookFetchService} from '../bookFetch.service';
import {Book} from "../book-create/book";
import {Commit} from "../book-create/commit";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  private html;
  private body;

  private book: Book;
  private fileName: String;
  private username: String;
  private userEmail: String;
  private editorForm: FormGroup;
  private editorStyle = {
    height: '400px',
    backgroundColor: 'white',
  };
  str: any;

  constructor(private service: GithubService,
              private router: Router,
              private bookFetch: BookFetchService,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.fileName = params['fileName'];
    });
  }

  ngOnInit() {
    this.editorForm = new FormGroup({
      editor: new FormControl()
    });
    this.username = this.bookFetch.getUsername();
    this.userEmail = this.bookFetch.getUserEmail();
    console.log('editing filename: ', this.fileName);
    this.bookFetch.getGit(this.fileName)
      .subscribe(
        data => {
          this.book = new Book(data.name, data.sha, atob(data.content));
          console.log(this.book);
          this.editorForm = new FormGroup({
            editor: new FormControl(this.book.content)
          });
        },
        error => {
        }
      );
  }

  onSubmit() {
    console.log(this.editorForm.get('editor').value);
    let content = btoa(this.editorForm.get('editor').value);
    let commit = new Commit("", this.username, this.userEmail, this.book.sha, content);
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
  back(){
    this.router.navigate(['/bookCreate']).then();
  }


}
