import {IResultActionHandler} from "../IResultActionHandler";
import {ActionResult, ActionResultAction} from "../../../../products/model/ActionResult";
import {ApplicationActionEvent} from "../../../../components/data-table/models/product-status";
import {ToastService} from "../../../toast.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ShowMessageResultActionHandler implements IResultActionHandler {

  constructor(private toast: ToastService) {
  }

  accept(actionResult: ActionResult): boolean {
    return actionResult.action === ActionResultAction.ShowMessage;
  }

  handle(product: string, actionEvent: ApplicationActionEvent, actionResult: ActionResult, actionResponse: any): void {
    this.toast.success(<string>actionResult.message);
  }

}
