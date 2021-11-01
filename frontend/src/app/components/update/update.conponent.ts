import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'app/data.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html'
})
export class UpdateComponent implements OnInit {
  form: any;
  vaccination = "0";
  account_role = "3"

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.form = new FormGroup({
        first_name: new FormControl(null),
        last_name: new FormControl(null),
        street_name: new FormControl(null),
        unit_number: new FormControl(null),
        area: new FormControl(null),
        zip_code: new FormControl(null),
        contact_number: new FormControl(null, Validators.pattern("^[0-9]*$")),
        gender: new FormControl(null),
        nric: new FormControl(null),
        account_role: new FormControl(null),
        race: new FormControl(null),
        ble_serial_number: new FormControl(null),
        password: new FormControl(null)
    })
  }

  // onSubmit() {
  //   this.form.value.gender = (this.form.value.gender == "Male")? 0 : 1
  //   this.dataService.recordRegister(this.form.value).subscribe((res: any) => {
  //     console.log(res);
  //   })
  //   const salt = bcrypt.genSaltSync(10);
  //   let hashed_password = bcrypt.hashSync(this.form.value.password, salt);
  //   let registerData = {
  //     nric: this.form.value.nric,
  //     hashed_password: hashed_password,
  //     user_salt: salt,
  //     ble_serial_number: this.form.value.ble_serial_number,
  //     account_role: this.form.value.role
  //   }
  //   console.log(registerData)
  //   this.dataService.register(registerData).subscribe((res: any) => {
  //     console.log(res);
  //   })
  // }

  retrieveUser() {
    this.dataService.getOneAccount({ nric: this.form.value.nric }).subscribe((res: any) => {
      this.account_role = res.data[0].account_role;
      this.form.patchValue({
        ble_serial_number: res.data[0].ble_serial_number
      })
    })
    this.dataService.getOneProfile({ nric: this.form.value.nric }).subscribe((res: any) => {
      this.form.patchValue({
        first_name: res.data[0].first_name,
        last_name: res.data[0].last_name,
        contact_number: res.data[0].contact_number
      })
    })
    this.dataService.getAddress({ nric: this.form.value.nric }).subscribe((res: any) => {
      this.form.patchValue({
          street_name: res.data[0].street_name,
          unit_number: res.data[0].unit_number,
          zip_code: res.data[0].zip_code,
          area: res.data[0].area
      })
    })
  }

  updatePassword() {
    const salt = bcrypt.genSaltSync(10);
    let hashed_password = bcrypt.hashSync(this.form.value.password, salt);
    this.dataService.changePassword({ new_hashed_password: hashed_password }).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateCredentials() {
    this.dataService.changeRole({ update_nric: this.form.value.nric, new_account_role: this.account_role }).subscribe((res: any) => {
      console.log(res);
    })
    this.dataService.changeBle({ update_nric: this.form.value.nric, new_ble_serial_number: this.form.value.ble_serial_number }).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateInfo() {
    let data = {
      // first_name: this.form.value.first_name,
      // last_name: this.form.value.last_name,
      // contact_number: this.form.value.contact_number,
      street_name: this.form.value.street_name,
      unit_number: this.form.value.unit_number,
      zip_code: this.form.value.zip_code,
      area: this.form.value.area
    }
    this.dataService.updateNames({ nric: this.form.value.nric, new_first_name: this.form.value.first_name, new_last_name: this.form.value.last_name }).subscribe((res: any) => {
      console.log(res);
    })
    this.dataService.updateNumber({ nric: this.form.value.nric, new_contact_number: this.form.value.contact_number }).subscribe((res: any) => {
      console.log(res);
    })
    this.dataService.updateUserAddress(data).subscribe((res: any) => {
      console.log(res);
    })
    if (this.vaccination == "1") {
      this.dataService.updatePartiallyVaccinated({nric: this.form.value.nric}).subscribe((res: any) => {
        console.log(res);
      })
    } else if (this.vaccination == "2") {
      this.dataService.updateFullyVaccinated({nric: this.form.value.nric}).subscribe((res: any) => {
        console.log(res);
      })
    }
  }
}