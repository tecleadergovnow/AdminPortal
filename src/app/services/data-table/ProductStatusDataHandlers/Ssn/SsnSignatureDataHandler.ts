import {SsnStatusDataHandler} from "./SsnStatusDataHandler";
import {DataColumn, DataColumnType} from "../../../../components/data-table/models/data-column";

export class SsnSignatureDataHandler extends SsnStatusDataHandler{
  getStatusDataColumns(): DataColumn[] {
    return this.getAllCommon();
  }
}
