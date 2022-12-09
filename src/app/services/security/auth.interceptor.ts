import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";

import {catchError, Observable, throwError} from "rxjs";
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addAuthenticationToken(req);
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.authenticationService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(err);
      })
    );
  }

  addAuthenticationToken(request: HttpRequest<any>) {
    const accessToken = this.authenticationService.currentUserValue?.accessToken;
    if (!accessToken) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

}
