import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-health-record',
  templateUrl: './health-record.component.html'
})
export class HealthRecordComponent implements OnInit {
  record;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getHealthDeclarationHistory().subscribe((res: any) => {
      this.record = res.data;
    })
  }

}