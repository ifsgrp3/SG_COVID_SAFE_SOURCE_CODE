import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-account-logs',
  templateUrl: './account-logs.component.html'
})
export class AccountLoggingComponent implements OnInit {
  logs;
  nric;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAccountLogs().subscribe((res: any) => {
      this.logs = res.data;
    })
  }

  search() {
    
  }

}