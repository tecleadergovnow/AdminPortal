import {DataColumn} from "../../../components/data-table/models/data-column";

export abstract class ProductStatusDataHandler {
  public abstract getStatusDataColumns(): DataColumn[];
}
