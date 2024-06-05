import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user_name: any, user_password: any) {
    return this.http.post<any>('http://localhost:3000/api/login', { user_name, user_password });
  }

  verifyOTP(email: string, otp: string, secret: string) {
    return this.http.post<any>('http://localhost:3000/api/otp', { email, otp, secret });
  }
}