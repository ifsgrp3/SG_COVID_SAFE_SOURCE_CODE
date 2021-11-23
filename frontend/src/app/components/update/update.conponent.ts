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
  account_role = "3";

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
        area: new FormControl("north"),
        zip_code: new FormControl(null),
        contact_number: new FormControl(null, Validators.pattern("^[0-9]*$")),
        gender: new FormControl(null),
        nric: new FormControl(null),
        account_role: new FormControl("3"),
        race: new FormControl(null),
        ble_serial_number: new FormControl(null),
        password: new FormControl(null),
        vaccination: new FormControl("0")
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
    let temp = this.form.value.nric.toLowerCase();
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
    this.dataService.getOneAccount({ nric: this.form.value.nric }).subscribe((res: any) => {
      // this.account_role = res.data[0].account_role;
      this.form.patchValue({
        ble_serial_number: res.data[0].ble_serial_number,
        account_role: res.data[0].account_role
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
    if (this.form.value.password === "" || !this.form.value.password) {
      alert("Please fill in password");
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    let hashed_password = bcrypt.hashSync(this.form.value.password, salt);
    this.dataService.changePassword({ new_hashed_password: hashed_password }).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateCredentials() {
    if (this.form.ble_serial_number === "" || !this.form.value.ble_serial_number) {
      alert("Please fill in BLE serial number")
    }
    this.dataService.changeRole({ update_nric: this.form.value.nric, new_account_role: this.form.value.account_role }).subscribe((res: any) => {
      console.log(res);
    })
    this.dataService.changeBle({ update_nric: this.form.value.nric, new_ble_serial_number: this.form.value.ble_serial_number }).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateInfo() {
    if (this.form.value.zip_code.length !== 6|| !this.form.value.zip_code) {
      alert("Zip code must be 6 digits long");
      return;
    }
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
    if (this.form.value.vaccination == "1") {
      this.dataService.updatePartiallyVaccinated({nric: this.form.value.nric}).subscribe((res: any) => {
        console.log(res);
      })
    } else if (this.form.value.vaccination == "2") {
      this.dataService.updateFullyVaccinated({nric: this.form.value.nric}).subscribe((res: any) => {
        console.log(res);
      })
    }
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