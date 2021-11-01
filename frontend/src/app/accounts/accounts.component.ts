import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAllAccounts().subscribe((res: any) => {
      this.accounts = res.data;
    })
  }

}