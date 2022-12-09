import {Injectable} from '@angular/core';
import {User, UserToken} from "./UserToken";
import {HttpClient} from "@angular/common/http";
import {BackendService} from "../backend/backend.service";
import {BehaviorSubject, Observable, of, tap} from "rxjs";
import {environment} from "../../../environments/environment";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  storageKeyToken = 'govnow-access';
  private currentUserSubject: BehaviorSubject<UserToken | undefined>;
  public currentUser: Observable<UserToken | undefined>;
  userInfo!: User;

  constructor(private http: HttpClient, private backend: BackendService, private user: UserService) {
    const currentToken = localStorage.getItem(this.storageKeyToken);
    this.currentUserSubject = new BehaviorSubject<UserToken | undefined>(currentToken ? JSON.parse(currentToken) : undefined);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserToken | undefined {
    return this.currentUserSubject.value;
  }

  public getAuthenticationToken(): Observable<UserToken | undefined> {
    return of(this.currentUserValue);
  }

  login(userName: string, password: string): Observable<any> {
    const url = `${environment.apiUrl}users/login`;
    return this.http.post<UserToken>(url, {userName, password}).pipe(
      tap((result: UserToken) => {
        localStorage.setItem(this.storageKeyToken, JSON.stringify(result));
        this.currentUserSubject.next(result);
      })
    );
  }

  logout() {
    this.user.setMetadata(undefined);
    localStorage.removeItem(this.storageKeyToken);
    this.currentUserSubject.next(undefined);
  }

}
