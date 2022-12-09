import {ApplicationActionEvent} from "../../../components/data-table/models/product-status";
import {Observable} from "rxjs";

export interface IApplicationActionHandler {
  accept(product: string, actionEvent: ApplicationActionEvent): boolean;
  handle(product: string, actionEvent: ApplicationActionEvent): Observable<any>;
}
