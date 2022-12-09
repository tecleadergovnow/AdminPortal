import {IResultActionHandler} from "../IResultActionHandler";
import {ActionResult, ActionResultAction} from "../../../../products/model/ActionResult";
import {ApplicationActionEvent} from "../../../../components/data-table/models/product-status";
import {DataTableService} from "../../../data-table/data-table.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ReloadDataTableResultActionHandler implements IResultActionHandler {
  constructor(private dataTableService: DataTableService) {
  }

  accept(actionResult: ActionResult): boolean {
    return actionResult.action === ActionResultAction.Reload;
  }

  handle(product: string, actionEvent: ApplicationActionEvent, actionResult: ActionResult, actionResponse: any): void {
    this.dataTableService.reload();
  }
}
