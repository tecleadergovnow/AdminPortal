import {Injectable} from '@angular/core';
import {ProductStatus} from "../../components/data-table/models/product-status";
import {
  ProductStatusHandlerFactory,
} from "./ProductStatusHandlers/ProductStatusHandlerFactory";
import {DataColumn} from "../../components/data-table/models/data-column";
import {productStatusDataHandlerFactory} from "./ProductStatusDataHandlers/ProductStatusDataHandlerFactory";
import {Observable, Subject} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class DataTableService {

  private reloadSubject = new Subject();

  constructor(private statusHandler: ProductStatusHandlerFactory) {
  }

  public getProductStatuses(product: string): ProductStatus[] | undefined {
    const handler = this.statusHandler.getHandler(product);
    if (handler) return handler.getProductStatuses();
    return undefined;
  }

  public getProductStatusDataColumns(product: string, status: string): DataColumn[] | undefined {
    const handler = productStatusDataHandlerFactory(product, status);
    if (handler) return handler.getStatusDataColumns();
    return undefined;
  }

  public reload() {
    this.reloadSubject.next(null);
  }

  public onReload(): Observable<any> {
    return this.reloadSubject.asObservable();
  }

}
