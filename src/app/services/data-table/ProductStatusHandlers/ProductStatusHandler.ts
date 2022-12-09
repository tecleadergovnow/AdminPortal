import {ProductStatus} from "../../../components/data-table/models/product-status";

export abstract class ProductStatusHandler {
  public abstract getProductStatuses(): ProductStatus[]
}
