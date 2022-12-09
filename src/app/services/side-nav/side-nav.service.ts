import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {SideNavItem} from "./SideNavItem";

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  private toggle = new Subject();

  private navItems: SideNavItem[] = [
    {
      label: "Search engine",
      link: '/search',
      active: true,
    },
    {
      label: 'PRODUCTS',
    },
    {
      label: "Social security number",
      link: "/products/ssn"
    }
  ];



  constructor() {
  }

  public getItems(): SideNavItem[] {
    return this.navItems;
  }

  public toggleChange() {
    this.toggle.next(null);
  }

  public onToggle(): Observable<any> {
    return this.toggle.asObservable();
  }

}
