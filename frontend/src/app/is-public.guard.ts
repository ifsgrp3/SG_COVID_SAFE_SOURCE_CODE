import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root'
})
export class IsPublicGuard implements CanActivate {
  constructor(
    private dataService: DataService,
    private router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isPublic = this.dataService.isPublicUser();
    if (!isPublic) {
      this.router.navigate(['/']);
    }
    return isPublic;
  }
}