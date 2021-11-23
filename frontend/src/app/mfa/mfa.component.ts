import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mfa',
  templateUrl: './mfa.component.html',
  // styleUrls: ['./login-page.component.scss']
})
export class MultiFactorAuthenticationComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private router: Router
  ) { }
  ngOnInit() {
  }

  authenticate() {
    // this.dataService.mfa().subscribe((res: any) => {
    //   sessionStorage.setItem('isLoggedIn', '1');
    //   this.router.navigate(['/']);
    // }, err => {
    //   sessionStorage.clear();
    //   this.router.navigate(['/login']);
    // })
      sessionStorage.setItem('isLoggedIn', '1');
      this.router.navigate(['/']);
  }
}