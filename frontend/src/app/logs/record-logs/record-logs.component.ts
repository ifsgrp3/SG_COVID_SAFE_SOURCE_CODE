import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-record-logs',
  templateUrl: './record-logs.component.html'
})
export class RecordLoggingComponent implements OnInit {
  logs;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getRecordLogs().subscribe((res: any) => {
      this.logs = res.data;
      // console.log(this.logs)
    })
  }

}