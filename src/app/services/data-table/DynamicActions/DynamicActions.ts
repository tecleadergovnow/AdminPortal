import {AppDataTable} from "../../../products/model/AppDataTable";
import {SSN_DYNAMIC_ACTIONS} from "./SsnDynamicActions";

export interface DynamicAction {
  action: string;
  isVisible(app: AppDataTable): boolean;
}

export const PRODUCTS_DYNAMIC_ACTIONS = {
  SSN: SSN_DYNAMIC_ACTIONS
}
