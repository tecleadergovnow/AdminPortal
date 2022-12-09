import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, tap} from "rxjs";
import {MatDrawer} from "@angular/material/sidenav";
import {SideNavItem} from "../../../services/side-nav/SideNavItem";
import {SideNavService} from "../../../services/side-nav/side-nav.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-in-content',
  templateUrl: './in-content.component.html',
  styleUrls: ['./in-content.component.scss']
})
export class InContentComponent implements OnInit, OnDestroy {

  unsubscribe = new Subject();
  title = 'AdminPortal';
  @ViewChild(MatDrawer) drawer!: MatDrawer;

  sideNavItems!: SideNavItem[];
  activeItem?: SideNavItem;

  constructor(private sideNavService: SideNavService, private router: Router) { }

  ngOnInit(): void {
    this.sideNavItems = this.sideNavService.getItems();
    this.activeItem = this.sideNavItems.find(c => c.active);
    this.sideNavService.onToggle().pipe(
      tap(() => {
        this.drawer.toggle();
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  clickItem(item: SideNavItem) {
    if (!item.link || item.active)
      return;
    item.active = true;
    if (this.activeItem) {
      this.activeItem.active = false;
    }
    this.activeItem = item;
    if (item.link) {
      this.router.navigate([item.link]);
    }
  }

}
