import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  sendNotification(notification){
    const header = {
      Authorization: 'Batman ' + localStorage.getItem('token')
    };
    const httpOptions = {
      headers: header
    };
    const postUrl = `http://13.126.150.171:8080/notification/api/send`;
    return this.http.post(postUrl,notification, httpOptions);

  }

  getNotification(username){
    const header = {
      Authorization: 'Batman ' + localStorage.getItem('token')
    };
    const httpOptions = {
      headers: header
    };
    const postUrl = `http://13.126.150.171:8080/notification/api/${username}`;
    return this.http.get(postUrl, httpOptions);

  }
}
