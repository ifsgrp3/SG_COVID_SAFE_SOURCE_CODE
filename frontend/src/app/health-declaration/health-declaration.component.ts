import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-health-declaration',
  templateUrl: './health-declaration.component.html'
})
export class HealthDeclarationComponent implements OnInit {
  date;
  symptoms = "0";
  temperature;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  onSubmit() {
    let data = {
      covid_symptoms: this.symptoms,
      temperature: this.temperature
    }
    if (!parseFloat(this.temperature)) {
      return;
    }
    this.dataService.uploadHealthDeclaration(data).subscribe((res: any) => {
      console.log(res);
    }, err => {
      console.log(err)
    })
  }

}