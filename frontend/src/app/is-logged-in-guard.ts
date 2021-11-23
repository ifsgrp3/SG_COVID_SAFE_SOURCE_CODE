import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {
  constructor(
    private dataService: DataService,
    private router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.dataService.isLoggedIn();
    if (!isLoggedIn) {
      sessionStorage.removeItem('isLoggedIn')
      this.router.navigate(['/mfa']);
    //   this.dataService.logout().subscribe((res: any) => {
    //     sessionStorage.clear();
    //     console.log("Bye");
    //     this.router.navigate(['/login']);
    //     window.location.reload();
    //   })
    }
    return isLoggedIn;
  }
}