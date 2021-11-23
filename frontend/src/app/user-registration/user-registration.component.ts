import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'app/data.service';
import * as bcrypt from 'bcryptjs';
import * as moment from 'moment';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html'
})
export class UserRegistrationComponent implements OnInit {
  form: any;
  todayDate;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.todayDate = moment().format("YYYY-MM-DD");
    this.initForm()
  }

  initForm() {
    this.form = new FormGroup({
        first_name: new FormControl("", [Validators.required,Validators.pattern("^[a-zA-Z0-9]*$")]),
        last_name: new FormControl("", [Validators.required,Validators.pattern("^[a-zA-Z0-9]*$")]),
        address: new FormControl(null, [Validators.required,Validators.pattern("^[a-zA-Z0-9]*$")]),
        unit_number: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$"),Validators.maxLength(3)]),
        area: new FormControl("north"),
        zip_code: new FormControl("",[Validators.required, Validators.pattern("^[0-9]*$"),Validators.maxLength(6)]),
        contact_number: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$"),Validators.maxLength(9)]),
        gender: new FormControl("male"),
        nric: new FormControl("", [Validators.required,Validators.maxLength(9),Validators.minLength(9),Validators.pattern("^[a-zA-Z0-9]*$")]), 
        role: new FormControl("3"),
        race: new FormControl("chinese", Validators.required),
        ble_serial_number: new FormControl(null, Validators.required),
        password: new FormControl("", Validators.required),
        date_of_birth: new FormControl(null, Validators.required),
        age: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$"),Validators.maxLength(3)])
    })
  }

  onSubmit() {
    this.form.value.gender = (this.form.value.gender == "Male")? "0" : "1"
    this.form.value.date_of_birth = moment(this.form.value.date_of_birth).format("YYYY-MM-DD");
    this.form.value.nric = this.form.value.nric.toLowerCase();
    let temp = this.form.value.nric;
    if (this.form.value.first_name.length === 0 || this.form.value.last_name.length === 0 || this.form.value.password.length === 0) {
      alert("Please fill in blank fields")
    }
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
    if (this.form.value.zip_code.length !== 6) {
      alert("Zip code must be 6 digits long");
      return;
    }
    this.dataService.recordRegister(this.form.value).subscribe((res: any) => {
      console.log(res);
    })
    const salt = bcrypt.genSaltSync(10);
    let hashed_password = bcrypt.hashSync(this.form.value.password, salt);
    let registerData = {
      nric: this.form.value.nric,
      hashed_password: hashed_password,
      user_salt: salt,
      ble_serial_number: this.form.value.ble_serial_number,
      account_role: this.form.value.role
    }
    let address = {
      nric: this.form.value.nric,
      street_name: this.form.value.address,
      unit_number: this.form.value.unit_number,
      zip_code: this.form.value.zip_code,
      area: this.form.value.area
    }
    this.dataService.register(registerData).subscribe((res: any) => {
      console.log(res);
    })
    this.dataService.addUserAddress(address).subscribe((res: any) => {
      console.log(res);
    })
  }

  onlyNumberKey(evt) {
          
    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
  }

  onlyValidCharsKey(evt) {
          
    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if ((ASCIICode > 31 && ASCIICode < 48) || (ASCIICode > 57 && ASCIICode < 65) 
    || (ASCIICode > 90 && ASCIICode < 97) || ASCIICode > 122)
        return false;
    return true;
  }

  onCharsKey(evt) {
    return this.onlyValidCharsKey(evt) && !this.onlyNumberKey(evt);
  }
}
