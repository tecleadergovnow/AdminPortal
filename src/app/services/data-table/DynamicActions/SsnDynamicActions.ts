import {DynamicAction} from "./DynamicActions";
import {AppSsnDataTable} from "../../../products/model/AppSsnDataTable";
import {REGENERATE_LABELS} from "../../../components/data-table/models/ApplicationActions";
import {ProductSsnType} from "../../../products/model/ProductSsnType";


export const SSN_DYNAMIC_ACTIONS: DynamicAction [] = [
  {
    action: REGENERATE_LABELS,
    isVisible: isVisibleSsnRegenerateLabels
  }
]

export function isVisibleSsnRegenerateLabels(app: AppSsnDataTable): boolean {
  return app.productSsnType !== ProductSsnType.InPerson;
}
