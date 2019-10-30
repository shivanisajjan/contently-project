import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import {GithubService} from "../github.service";
import { BookFetchService } from '../bookFetch.service';

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

  constructor(private service: GithubService, private router: Router,public bookFetch:BookFetchService) {}

  ngOnInit() {
    this.str = '<p>hello</p>';
    this.editorForm = new FormGroup({
      editor: new FormControl()
    });
    // this.service.getFromGithub().subscribe(
    //   data => {
    //     this.body = data;
    //     this.html = JSON.parse(atob(this.body.content));
    //     this.service.setBody(this.body);
    //     this.service.setHtml(this.html);
    //     this.editorForm = new FormGroup({
    //       editor: new FormControl(this.html.inputHtml)
    //     });
    //   },
    //   error => {
    //     console.log('error', error);
    //   }
    // );
  }

  // onSubmit() {
  //   this.html.inputHtml = this.editorForm.get('editor').value;
  //   console.log(this.html);
  //   this.service.setHtml(JSON.stringify(this.html));
  //   this.router.navigate(['/preview']).then( );
  // }

  bod:any;
  goToGitView() {
    this.bod = {
      message: 'my commit message',
      committer: {
        name: 'Author Name',
        email: 'author@github.com'
      },
      // sha,
      
      content: btoa(this.editorForm.get('editor').value)
    };
     
    this.bookFetch.createFile(this.bod).subscribe((data) =>{ console.log(data);}); 
    console.log(this.editorForm.get('editor').value);

    this.router.navigateByUrl('bookCreate');

  
  }

}
