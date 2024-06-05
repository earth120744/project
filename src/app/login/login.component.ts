import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isVisible = false;
  Loginform!: FormGroup;
  otpSecret!: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private sv: LoginService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.Loginform = this.fb.group({
      user_name: [null, Validators.required],
      user_password: [null, Validators.required]
    });
  }

  showModal() {
    if (this.Loginform.valid) {
      const user_name = this.Loginform.value.user_name;
      const user_password = this.Loginform.value.user_password;

      this.sv.login(user_name, user_password).subscribe(
        (response) => {
          if (response.success) {
            this.otpSecret = response.otpSecret;
            this.isVisible = true;
            console.log('login pass', response);
          } else {
            console.log('Invalid username or password');
          }
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
    } else {
      console.log('Please enter your username or password');
    }
  }

  handleOk() {
    this.router.navigate(['web']);
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel() {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
