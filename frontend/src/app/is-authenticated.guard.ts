import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(
    private dataService: DataService,
    private router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.dataService.isAuthenticated();
    if (!isAuthenticated) {
      sessionStorage.clear();
      this.router.navigate(['/login']);
      // this.dataService.logout().subscribe((res: any) => {
      //   sessionStorage.clear();
      //   this.router.navigate(['/login']);
      // })
    }
    return isAuthenticated;
  }
}
