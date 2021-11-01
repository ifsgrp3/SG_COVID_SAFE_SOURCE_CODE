import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-covid19-history',
  templateUrl: './covid19-history.component.html'
})
export class Covid19HistoryComponent implements OnInit {

  history = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCovidTest().subscribe((res: any) => {
      this.history = res.data;
    })
  }

}