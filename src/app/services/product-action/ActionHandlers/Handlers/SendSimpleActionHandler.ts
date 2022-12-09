import {Injectable} from "@angular/core";
import {IApplicationActionHandler} from "../IApplicationActionHandler";
import {ApplicationActionEvent} from "../../../../components/data-table/models/product-status";
import {Observable} from "rxjs";
import {BackendService} from "../../../backend/backend.service";
import {
  CONFIRM,
  REGENERATE_FORM,
  REGENERATE_LABELS,
  REGENERATE_PACKAGE
} from "../../../../components/data-table/models/ApplicationActions";

@Injectable({
  providedIn: 'root'
})
export class SendSimpleActionHandler implements IApplicationActionHandler {
  private readonly SIMPLE_ACTIONS: string[] = [
    REGENERATE_FORM,
    REGENERATE_PACKAGE,
    REGENERATE_LABELS,
    CONFIRM
  ];

  constructor(private backend: BackendService) {
  }

  accept(product: string, actionEvent: ApplicationActionEvent): boolean {
    return this.SIMPLE_ACTIONS.includes(actionEvent.action.action);
  }

  handle(product: string, actionEvent: ApplicationActionEvent): Observable<any> {
    return this.backend.action({
      product: product,
      actionType: actionEvent.action.action,
      applicationId: actionEvent.application.id
    });
  }

}
