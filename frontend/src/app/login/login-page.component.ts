import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  // styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginData: any = <any>{};
  constructor(
    private dataService: DataService,
    private router: Router
  ) { }
  ngOnInit() {
  }
  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    this.dataService.login(this.loginData)
      .subscribe((res: any) => {
        if (res.error) {
          alert(res.error);
        }
        // console.log(jwtDecode(res.token))
        res.token = this.dataService.encryptData(res.token);
        sessionStorage.setItem('token', res.token);
        // this.dataService.bake_cookie('token', res.token)
        this.router.navigate(['/mfa']);
      }, err => {
        alert('Invalid username or password');
      })
  }
}