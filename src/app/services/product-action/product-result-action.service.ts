import {Injectable} from '@angular/core';
import {ApplicationActionEvent} from "../../components/data-table/models/product-status";
import {ResultActionHandlersFactory} from "./ResultActionHandlers/ResultActionHandlersFactory";

@Injectable({
  providedIn: 'root'
})
export class ProductResultActionService {

  constructor(private factory: ResultActionHandlersFactory) {
  }

  public handleResultAction(product: string, actionEvent: ApplicationActionEvent, actionResponse: any) {
    if (actionEvent.action.resultActions && actionEvent.action.resultActions.length > 0) {
      actionEvent.action.resultActions.forEach(actionResult => {
        const handler = this.factory.getHandler(actionResult);
        if (handler) {
          handler.handle(product, actionEvent, actionResult, actionResponse);
        }
      });
    }
  }
}
