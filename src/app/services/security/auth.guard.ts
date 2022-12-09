import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AuthorizationService} from "./authorization.service";



@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private router: Router,
    private authorization: AuthorizationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authorization.checkUser(({logged}) => {
      if (!logged) {
        const {queryParams: query} = state.root;
        const path = state.url.split('?')[0];
        sessionStorage.setItem('gv.redirect', JSON.stringify({
          path,
          query,
        }));
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    });
  }

}
