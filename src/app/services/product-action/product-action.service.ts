import {Injectable} from '@angular/core';
import {Observable, of, tap} from "rxjs";
import {ApplicationActionEvent} from "../../components/data-table/models/product-status";
import {ApplicationActionHandlerFactory} from "./ActionHandlers/ApplicationActionHandlerFactory";

@Injectable({
  providedIn: 'root'
})
export class ProductActionService {

  constructor(private factory: ApplicationActionHandlerFactory) {
  }

  handleAction(product: string, actionEvent: ApplicationActionEvent): Observable<any> {
    const handler = this.factory.getHandler(product, actionEvent);
    if(!handler) return of(null);

    return handler.handle(product, actionEvent);
  }
}
