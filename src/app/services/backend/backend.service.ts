import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {GetApplicationsDto} from "../../products/model/GetApplicationsDto";
import {AdminActionDto} from "../product-action/ActionHandlers/AdminActionDto";
import {User} from "../security/UserToken";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) {
  }

  public getApplications(dto: GetApplicationsDto): Observable<any> {
    const url = `${environment.apiUrl}applications/all`;
    return this.http.post<any>(url, dto);
  }

  public downloadForm(action: AdminActionDto): Observable<any> {
    const url = `${environment.apiUrl}applications/action`;
    // @ts-ignore
    return this.http.post<any>(url, action, {responseType: "blob", headers: {'Accept': 'application/pdf'}});
  }

  public action(action: AdminActionDto): Observable<any> {
    const url = `${environment.apiUrl}applications/action`;
    return this.http.post<any>(url, action);
  }

  public me(): Observable<User> {
    const url = `${environment.apiUrl}users/me`;
    return this.http.get<any>(url);
  }

  public getApplication(product: string, applicationId: number): Observable<any> {
    const url = `${environment.apiUrl}applications?product=${product}&applicationId=${applicationId}`;
    return this.http.get<any>(url);
  }

}
