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
    return this.http.post(postUrl, notification, httpOptions);

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

  deleteNotification(id){
    const header = {
      Authorization: 'Batman ' + localStorage.getItem('token')
    };
    const httpOptions = {
      headers: header
    };
    const postUrl = `http://13.126.150.171:8080/notification/api/delete/${id}`;
    return this.http.delete(postUrl, httpOptions);

  }

  updateNotifications(list){
    const header = {
      Authorization: 'Batman ' + localStorage.getItem('token')
    };
    const httpOptions = {
      headers: header
    };
    const postUrl = `http://13.126.150.171:8080/notification/api/update`;
    return this.http.put(postUrl, list, httpOptions);

  }
}
