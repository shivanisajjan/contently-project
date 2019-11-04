import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { user } from './user';
import { userReg } from './userReg';
import { profile } from './profile';
import { Observable } from 'rxjs';
const httpOptions = {
headers: new HttpHeaders({'Content-Type':'application/json'})
};
@Injectable({
 providedIn: 'root'
})
export class LoginService {
 public role: string;
 public jwtToken: string;
 constructor(private http:HttpClient) { }
 authenticateUser(checkUser: user):Observable<HttpResponse<any>>{
   let post_url = `http://13.126.150.171:8080/user-management/api/v1/user/login`;
   return this.http.post(post_url,checkUser,{ observe: 'response' });
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




setRole(role){
  this.role = role;
}

getRole(){
  console.log("aditya"+this.role);
  return this.role;
}

setJwtToken(token){
  this.jwtToken = token;
}

getjwtToken(){
  return this.jwtToken;
}
}
