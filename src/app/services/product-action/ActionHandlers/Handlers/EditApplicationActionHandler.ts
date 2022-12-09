import {IApplicationActionHandler} from "../IApplicationActionHandler";
import {ApplicationActionEvent} from "../../../../components/data-table/models/product-status";
import {EDIT_INFORMATION} from "../../../../components/data-table/models/ApplicationActions";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class EditApplicationActionHandler implements IApplicationActionHandler {

  constructor(private router: Router) {
  }

  accept(product: string, actionEvent: ApplicationActionEvent): boolean {
    return actionEvent.action.action === EDIT_INFORMATION;
  }

  handle(product: string, actionEvent: ApplicationActionEvent): Observable<any> {
    const route = '/products/' + product.toLowerCase() + '/edit/' + actionEvent.application.id;
    return of(this.router.navigate([route]))
  }

}
