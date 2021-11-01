import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpResponse,
    HttpErrorResponse,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
import { map, filter, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class HttpReqInterceptor implements HttpInterceptor {
    constructor(
        public router: Router
    ) { }
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let modifiedReq = req.clone({});
        if (localStorage.getItem('token')) {
            modifiedReq = modifiedReq.clone({
                setHeaders: {
                    authorization: localStorage.getItem('token')
                }
            });
        }
    return next.handle(modifiedReq).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {}
        }));
    }
}