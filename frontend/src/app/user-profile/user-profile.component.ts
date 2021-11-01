import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  record = {
    name: "",
    age: 0,
    number: "",
    birth: "",
    race: "",
    address: "",
    vaccination_status: ""
  };

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getProfile()
      .subscribe((res: any) => {
        // console.log(res)
        this.record.name = res.data[0].first_name + " " + res.data[0].last_name;
        this.record.age = res.data[0].age;
        this.record.number = res.data[0].contact_number;
        this.record.birth = res.data[0].date_of_birth;
        this.record.race = res.data[0].race;
        this.record.address = res.data[0].street_name;
      }, err => {
        console.log(err)
      })
  }

}
