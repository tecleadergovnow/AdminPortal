import {SsnStatusDataHandler} from "./SsnStatusDataHandler";
import {DataColumn} from "../../../../components/data-table/models/data-column";

export class SsnInvalidAddressDataHandler extends SsnStatusDataHandler{
  getStatusDataColumns(): DataColumn[] {
    return this.getAllCommon();
  }
}
