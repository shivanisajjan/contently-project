import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import {GithubService} from "../github.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  private html;
  private body;
  private editorForm: FormGroup;
  private editorStyle = {
    height: '500px',
    backgroundColor: 'white',
  };
  str: any;

  constructor(private service: GithubService, private router: Router) {}

  ngOnInit() {
    this.str = '<p>hello</p>';
    this.editorForm = new FormGroup({
      editor: new FormControl()
    });
    this.service.getFromGithub().subscribe(
      data => {
        this.body = data;
        this.html = JSON.parse(atob(this.body.content));
        this.service.setBody(this.body);
        this.service.setHtml(this.html);
        this.editorForm = new FormGroup({
          editor: new FormControl(this.html.inputHtml)
        });
      },
      error => {
        console.log('error', error);
      }
    );
  }

  onSubmit() {
    this.html.inputHtml = this.editorForm.get('editor').value;
    console.log(this.html);
    this.service.setHtml(JSON.stringify(this.html));
    this.router.navigate(['/preview']).then( );
  }

  goToGitView() {
    this.router.navigate(['/git-view']).then();
  }

}
