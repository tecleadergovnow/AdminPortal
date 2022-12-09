import {ProductStatusHandler} from "./ProductStatusHandler";
import {SsnStatusHandler} from "./SsnStatusHandler";
import {Injectable, Injector} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ProductStatusHandlerFactory {

  constructor(private DI: Injector) {
  }

  getHandler(product: string): ProductStatusHandler | undefined {
    if (product === 'SSN') {
      return this.DI.get(SsnStatusHandler);
    }
    return undefined;
  }
}
