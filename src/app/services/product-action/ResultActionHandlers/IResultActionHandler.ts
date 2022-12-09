import {ActionResult} from "../../../products/model/ActionResult";
import {ApplicationActionEvent} from "../../../components/data-table/models/product-status";

export interface IResultActionHandler {
  accept(actionResult: ActionResult): boolean;
  handle(product: string, actionEvent: ApplicationActionEvent, actionResult: ActionResult, actionResponse: any): void;
}
