import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-covid19-declaration',
  templateUrl: './covid19-declaration.component.html'
})
export class Covid19DeclarationComponent implements OnInit {
  record;
  nric; 

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCovidDashboard().subscribe((res: any) => {
      this.record = res.data;
    })
  }

  search(nric) {
    this.dataService.getCovidDashboard().subscribe((res: any) => {
      this.record = res.data;
      this.record = this.record.filter(r => r.nric == nric.toLowerCase())
    })
  }

}