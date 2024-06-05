import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }
  
  post(user_name: string, user_password: string, user_email: string) {
    return this.http.post<any>('http://localhost:3000/api/signup', {user_name, user_password, user_email});
  }
}
