import {Injectable, Injector} from "@angular/core";
import {ApplicationActionEvent} from "../../../components/data-table/models/product-status";
import {IApplicationActionHandler} from "./IApplicationActionHandler";

import {EditApplicationActionHandler} from "./Handlers/EditApplicationActionHandler";
import {DownloadFormActionHandler} from "./Handlers/DownloadFormActionHandler";
import {SendSimpleActionHandler} from "./Handlers/SendSimpleActionHandler";

@Injectable({
  providedIn: 'root'
})
export class ApplicationActionHandlerFactory {
  private handlers: IApplicationActionHandler[] = [];

  constructor(private DI: Injector) {
    this.handlers = [
      this.DI.get(EditApplicationActionHandler),
      this.DI.get(DownloadFormActionHandler),
      this.DI.get(SendSimpleActionHandler)
    ];
  }

  public getHandler(product: string, actionEvent: ApplicationActionEvent): IApplicationActionHandler | undefined {
    return this.handlers.find(c => c.accept(product, actionEvent));
  }
}
