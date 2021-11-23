import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-vaccination-status',
  templateUrl: './vaccination-status.component.html'
})
export class VaccinationStatusComponent implements OnInit {
  data = {
    nric: "",
    vaccination_status: 0,
    vaccine_type: "pfizer",
    vaccination_centre_location: "",
    first_dose_date: "",
    second_dose_date: ""
  }
  todayDate;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.todayDate = moment().format("YYYY-MM-DD");
  }

  onSubmit() {
    let temp = this.data.nric.toLowerCase();
    if (temp.length !== 9 || parseInt(temp[0]) || parseInt(temp[8])) {
      alert("NRIC must be 9 characters long where first and last characters are in the alphabet");
      return;
    }
    for (let i =1; i <= 7; i++) {
      if (!parseInt(temp[i]) && parseInt(temp[i]) !== 0) {
        alert("NRIC must be 9 characters long where first and last characters are in the alphabet");
        return;
      }
    }
    this.data.first_dose_date = moment(this.data.first_dose_date).format("YYYY-MM-DD");
    this.data.second_dose_date = moment(this.data.second_dose_date).format("YYYY-MM-DD");
    this.dataService.uploadVaccinationStatus(this.data).subscribe((res: any) => {
      console.log(res);
    })
  }

  onlyValidCharsKey(evt) {
          
    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if ((ASCIICode > 31 && ASCIICode < 48) || (ASCIICode > 57 && ASCIICode < 65) 
    || (ASCIICode > 90 && ASCIICode < 97) || ASCIICode > 122)
        return false;
    return true;
  }

}