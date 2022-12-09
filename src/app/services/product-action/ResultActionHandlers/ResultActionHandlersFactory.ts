import {Injectable, Injector} from "@angular/core";
import {IResultActionHandler} from "./IResultActionHandler";
import {ShowMessageResultActionHandler} from "./Handlers/ShowMessageResultActionHandler";
import {ActionResult} from "../../../products/model/ActionResult";
import {ReloadDataTableResultActionHandler} from "./Handlers/ReloadDataTableResultActionHandler";

@Injectable({
  providedIn: 'root'
})
export class ResultActionHandlersFactory {
  private handlers: IResultActionHandler[] = [];

  constructor(private DI: Injector) {
    this.handlers = [
      this.DI.get(ShowMessageResultActionHandler),
      this.DI.get(ReloadDataTableResultActionHandler),
    ];
  }

  public getHandler(actionResult: ActionResult): IResultActionHandler | undefined {
    return this.handlers.find(c => c.accept(actionResult));
  }
}
