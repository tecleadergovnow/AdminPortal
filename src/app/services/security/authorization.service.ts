import {Injectable} from '@angular/core';
import {BackendService} from "../backend/backend.service";
import {AuthenticationService} from "./authentication.service";
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {CheckUserRedirect} from "./UserToken";
import {catchError, mergeMap, Observable, of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(
    private backend: BackendService,
    private authentication: AuthenticationService,
    private user: UserService,
    private router: Router
  ) {
  }

  checkUser(redirect: CheckUserRedirect): Observable<boolean> {
    return this.authentication.getAuthenticationToken().pipe(
      mergeMap(token => {
        if (!token) {
          return of(redirect({logged: false}))
        }
        const metadata = this.user.getMetadata()
        if (this.user.hasMetadata() && metadata) {
          return of(redirect({logged: true}))
        } else {
          return this.backend.me().pipe(
            mergeMap(result => {
              this.user.setMetadata(result);
              return of(redirect({logged: true}))
            }),
            catchError(error => {
              const noService = error instanceof HttpErrorResponse && (error.status === 0 || error.status === 500);
              if (noService) {
                localStorage.setItem('appCurrentError', '2');
                this.router.navigate(['/maintenance']);
                return of(false);
              }
              const forbiddenError = error instanceof HttpErrorResponse && error.status === 403;
              if (forbiddenError) {
                return of(false);
              }
              const unautorized = error instanceof HttpErrorResponse && error.status === 401;
              if (forbiddenError) {
                return of(false);
              }
              return of(false);
            })
          )
        }
      })
    );
  }
}
