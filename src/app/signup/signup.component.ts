import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  signupForm!: FormGroup
  test: any

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sv: SignupService
  ){}

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.signupForm = this.fb.group({
      user_email: [null, Validators.required],
      user_name: [null, Validators.required],
      user_password: [null, Validators.required]
    })
  }

  signup() {
    var user_email = this.signupForm.value.user_email
    var user_name = this.signupForm.value.user_name
    var user_password = this.signupForm.value.user_password

    if(this.signupForm.valid) {
      this.sv.post(user_name, user_password, user_email).subscribe((response:any) => {
        console.log('Signup successful', response);
        this.router.navigate(['login']);
      }, error => {
        console.error('Error during signup', error);
      });
    } else {
      console.log('Please enter your email or username or password');
    }
  }
}
