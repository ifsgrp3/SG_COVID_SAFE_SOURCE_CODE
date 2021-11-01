import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'app/data.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html'
})
export class UserRegistrationComponent implements OnInit {
  form: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.form = new FormGroup({
        first_name: new FormControl(null, Validators.required),
        last_name: new FormControl(null, Validators.required),
        address: new FormControl(null, Validators.required),
        unit_number: new FormControl(null, Validators.required),
        area: new FormControl(null),
        zip_code: new FormControl(null),
        contact_number: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
        gender: new FormControl(null, Validators.required),
        nric: new FormControl(null, Validators.required),
        role: new FormControl(null),
        race: new FormControl(null, Validators.required),
        ble_serial_number: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
        date_of_birth: new FormControl(null, Validators.required),
        age: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")])
    })
  }

  onSubmit() {
    this.form.value.gender = (this.form.value.gender == "Male")? "0" : "1"
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
    console.log(registerData)
    this.dataService.register(registerData).subscribe((res: any) => {
      console.log(res);
    })
    this.dataService.addUserAddress(address).subscribe((res: any) => {
      console.log(res);
    })
  }
}
