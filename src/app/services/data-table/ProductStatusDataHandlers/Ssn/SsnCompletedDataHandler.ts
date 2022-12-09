import {SsnStatusDataHandler} from "./SsnStatusDataHandler";
import {DataColumn} from "../../../../components/data-table/models/data-column";

export class SsnCompletedDataHandler extends SsnStatusDataHandler{
  getStatusDataColumns(): DataColumn[] {
    return this.getAllCommon();
  }

}
