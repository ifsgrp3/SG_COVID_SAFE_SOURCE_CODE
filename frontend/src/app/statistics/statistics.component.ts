import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit {
  stats;
  p: number = 1;
  option = "rate";
  percentage;
  cases;
  data = {
    area: "central",
    gender: "male",
    age: "21-30"
  }

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  retrieve() {
    this.dataService.query(this.data).subscribe((res: any) => {
      this.stats = res.data;
      if (this.option == "rate") {
        let filtered = this.stats.filter(i => (i["vaccination_status"] == "Fully Vaccinated" || i["vaccination_status"] == "Partially Vaccinated"));
        this.percentage = filtered.length * 100 / res.length;
      } else {
        let filtered = this.stats.filter(i => i.test_result == "Positive");
        this.cases = filtered.length;
      }
    })
  }

}