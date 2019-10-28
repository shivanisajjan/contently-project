import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  // Personal Access Token for contently-books github
  private headers = {
    Authorization: 'Token 5d76d53171394e79a0d18183bcd77cc2ed18cb23'
  };
  private httpOptions = {
    headers : this.headers
  };

  // github user-name
  private gitUserName = 'contently-books';
  // user name, unique for each user logged in
  private userName;
  // content git url, received from content-services
  private contentGitUrl;
  // JSON body of github api requests
  private body;
  // html code for each content
  private html;

  getContentGitUrl() {
    return this.contentGitUrl;
  }

  setContentGitUrl(value) {
    this.contentGitUrl = value;
  }

  getGitUserName(): string {
    return this.gitUserName;
  }

  setGitUserName(value: string) {
    this.gitUserName = value;
  }

  setHtml(html) {
    this.html = html;
  }

  getHtml() {
    return this.html;
  }

  setBody(body) {
    this.body = body;
    console.log('service: ', this.body);
  }
  getBody() {
    return this.body;
  }

  putToGithub(): Observable<any> {
    const url = 'https://api.github.com/repos/itsmeavinashprasad/sample1/contents/chapter1/htmlfile.html';
    const sha = this.body.sha;
    this.body = {
      message: 'my commit message',
      committer: {
        name: 'Author Name',
        email: 'author@github.com'
      },
      sha,
      content: btoa(this.html)
    };
    console.log('putToGithub: ', this.body);
    return this.http.put(url, this.body, this.httpOptions);
  }
  getFromGithub() {
    const url = 'https://api.github.com/repos/itsmeavinashprasad/sample1/contents/chapter1/htmlfile.html';
    return this.http.get(url, this.httpOptions);
  }
}

