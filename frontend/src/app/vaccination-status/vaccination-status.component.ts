import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-vaccination-status',
  templateUrl: './vaccination-status.component.html'
})
export class VaccinationStatusComponent implements OnInit {
  data = {
    nric: "",
    vaccination_status: 0,
    vaccine_type: "",
    vaccination_centre_location: "",
    first_dose_date: "",
    second_dose_date: ""
  }

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.data.nric = this.data.nric.toLowerCase();
    this.dataService.uploadVaccinationStatus(this.data).subscribe((res: any) => {
      console.log(res);
    })
  }

}