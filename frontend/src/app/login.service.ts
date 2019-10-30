import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user } from './user';
import { userReg } from './userReg';
import { profile } from './profile';
const httpOptions = {
headers: new HttpHeaders({'Content-Type':'application/json'})
};
@Injectable({
 providedIn: 'root'
})
export class LoginService {
 public username: string;
 constructor(private http:HttpClient) { }
 authenticateUser(checkUser: user):any{
   let post_url = `http://13.126.150.171:8080/user-management/api/v1/user/login`;
   return this.http.post(post_url,checkUser,httpOptions);
 }

 registerUser(regUser: userReg):any{
  let post_url = `http://13.126.150.171:8080/user-management/api/v1/user/register`;
  return this.http.post(post_url,regUser,httpOptions);
}

updateUser(regUser: userReg):any{
  let post_url = `http://13.126.150.171:8080/user-management/api/v1/user/update`;
  return this.http.put(post_url,regUser,httpOptions);
}

saveInterests(saveProfile : profile):any{
  let post_url = `http://13.126.150.171:8080/profile-service/api/v1/profile`;
  return this.http.post(post_url, saveProfile, httpOptions);
}

getUser(username : string):any{
  let post_url = `http://13.126.150.171:8080/profile-service/api/v1/profile/${username}`;
  return this.http.get(post_url, httpOptions);
}

setUsername(username){
  this.username = username;
}

getUsername(){
  return this.username;
}
}