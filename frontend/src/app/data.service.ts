import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as CryptoJS from 'crypto-js';

const helper = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class DataService {
  // error = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
  }
  // Credentials DB
  getAllAccounts() {
    return this.http.get(`${environment["apiUrl"]}/auth/accs`);
  }

  getOneAccount(data) {
    return this.http.post(`${environment["apiUrl"]}/auth/acc`, data);
  }

  login(data) {
    return this.http.post(`${environment["apiUrl"]}/auth/login`, data);
  }

  logout() {
    return this.http.get(`${environment["apiUrl"]}/auth/logout`);
  }

  register(data) {
    return this.http.post(`${environment["apiUrl"]}/auth/register`, data);
  }

  mfa() {
    return this.http.get(`${environment["apiUrl"]}/auth/mfa`);
  }

  getAccountLogs() {
    return this.http.get(`${environment["apiUrl"]}/auth/acc/logs`);
  }

  activateAccount(data) {
    return this.http.post(`${environment["apiUrl"]}/auth/acc/act`, data);
  }

  deactivateAccount(data) {
    return this.http.post(`${environment["apiUrl"]}/auth/acc/deact`, data);
  }

  getMenuItems() {
    return this.http.get(`${environment["apiUrl"]}/auth/items`);
  }

  changePassword(data) {
    return this.http.put(`${environment["apiUrl"]}/auth/acc/pass`, data);
  }

  changeRole(data) {
    return this.http.put(`${environment["apiUrl"]}/auth/acc/role`, data);
  }

  changeBle(data) {
    return this.http.put(`${environment["apiUrl"]}/auth/acc/ble`, data);
  }

  // Records DB
  recordRegister(data) {
    return this.http.post(`${environment["apiUrl"]}/records/reg`, data);
  }

  getProfile() {
    return this.http.get(`${environment["apiUrl"]}/records/profile`);
  }

  getOneProfile(data) {
    return this.http.post(`${environment["apiUrl"]}/records/one_profile`, data);
  }

  getAddress(data) {
    return this.http.post(`${environment["apiUrl"]}/records/get_address`, data);
  }

  uploadCovidTest(data) {
    return this.http.post(`${environment["apiUrl"]}/records/upload_test`, data);
  }

  getCovidTest() {
    return this.http.get(`${environment["apiUrl"]}/records/test_history`);
  }

  uploadHealthDeclaration(data) {
    return this.http.post(`${environment["apiUrl"]}/records/upload_declaration`, data);
  }

  getHealthDeclarationHistory() {
    return this.http.get(`${environment["apiUrl"]}/records/declaration_history`);
  }

  getRecordLogs() {
    return this.http.get(`${environment["apiUrl"]}/records/record_logs`);
  }

  uploadVaccinationStatus(data) {
    return this.http.post(`${environment["apiUrl"]}/records/upload_vaccination`, data);
  }

  getVaccinationStatus(data) {
    return this.http.post(`${environment["apiUrl"]}/records/vaccination_history`, data);
  }

  getCovidDashboard() {
    return this.http.get(`${environment["apiUrl"]}/records/covid_dashboard`);
  }

  query(data) {
    return this.http.post(`${environment["apiUrl"]}/records/statistics`, data);
  }

  addUserAddress(data) {
    return this.http.post(`${environment["apiUrl"]}/records/address`, data);
  }

  updateUserAddress(data) {
    return this.http.put(`${environment["apiUrl"]}/records/address`, data);
  }

  updateNumber(data) {
    return this.http.put(`${environment["apiUrl"]}/records/update_num`, data);
  }

  removeUser(data) {
    return this.http.delete(`${environment["apiUrl"]}/records/user`, data);
  }

  updateNames(data) {
    return this.http.put(`${environment["apiUrl"]}/records/user/names`, data);
  }

  updatePartiallyVaccinated(data) {
    return this.http.put(`${environment["apiUrl"]}/records/update_vacc_partially`, data);
  }

  updateFullyVaccinated(data) {
    return this.http.put(`${environment["apiUrl"]}/records/update_vacc_fully`, data);
  }

  // Check authentication
  

  // Data encryption
  encryptData(data) {

    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), environment.JWT_KEY).toString();
    } catch (e) {
      console.log(e);
    }
  }

  decryptData(data) {

    try {
      const bytes = CryptoJS.AES.decrypt(data, environment.JWT_KEY);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  // Check logged in
  isAuthenticated() {
    try {
      const token = this.decryptData(sessionStorage.getItem('token'));
      const decodedToken = helper.decodeToken(token);
      const isExpired = helper.isTokenExpired(token);
      return !!decodedToken && !isExpired;
    }
    catch (ex) {
      return false;
    }
  }

  isLoggedIn() {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      if (isLoggedIn == '1') {
        return true;
      } else {
        return false;
      }
  }

  isAdmin() {
    const token = this.decryptData(sessionStorage.getItem('token'));
    const decodedToken = helper.decodeToken(token);
    if(decodedToken["account_role"] == 1) {
      return true;
    } else {
      return false;
    }
  }

  isPublicUser() {
    const token = this.decryptData(sessionStorage.getItem('token'));
    const decodedToken = helper.decodeToken(token);
    if (decodedToken["account_role"] == 3) {
      return true;
    } else {
      return false;
    }
  }

  isCovidPersonnel() {
    const token = this.decryptData(sessionStorage.getItem('token'));
    const decodedToken = helper.decodeToken(token);
    if (decodedToken["account_role"] == 2) {
      return true;
    } else {
      return false;
    }
  }

}