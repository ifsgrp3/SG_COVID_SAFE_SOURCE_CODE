import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/covid-test', title: 'COVID-19 Test Results', icon: 'content_paste', class: '' },
    { path: '/covid-history', title: 'COVID-19 Test History', icon: 'content_paste', class: '' },
    { path: '/health-declaration', title: 'Health Declaration', icon: 'content_paste', class: '' },
    { path: '/health-record', title: 'Health Record', icon: 'content_paste', class: '' },
    { path: '/statistics', title: 'Query Database', icon: 'content_paste', class: '' },
    { path: '/news', title: 'News Bulletin', icon: 'content_paste', class: '' },
    { path: '/accounts', title: 'Accounts Management', icon: 'content_paste', class: '' },
    { path: '/registration', title: 'User Registration', icon: 'content_paste', class: '' },
    { path: '/account-logs' , title: 'Accounts Logging', icon: 'content_paste', class: '' },
    { path: '/record-logs' , title: 'Records Logging', icon: 'content_paste', class: '' },
    { path: '/vaccination' , title: 'Vaccination Status', icon: 'content_paste', class: '' },
    { path: '/covid-declaration' , title: 'COVID-19 Personnel Dashboard', icon: 'content_paste', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.dataService.getMenuItems().subscribe((res: any) => {
      this.menuItems = res.data;
    })
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
