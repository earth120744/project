import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user_name:any, user_password:any) {
    return this.http.post<any>('http://localhost:3000/api/login', {user_name, user_password})
  }

  sendOtp(email: string) {
    return this.http.post<any>('http://localhost:3000/api/mail', { email });
  }

  // post(email:any, username:any, password:any) {
  //   return this.http.post('http://localhost:3000/api/signup', {email:email, username:username, password:password})
  // }
}
