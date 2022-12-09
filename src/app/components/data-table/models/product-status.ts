import {ActionResult} from "../../../products/model/ActionResult";

export interface ProductStatus {
  name: string,
  label: string;
  applicationActions: ApplicationAction[]
}

export interface ApplicationAction {
  label: string;
  action: string;
  icon?: string;
  disabled?: boolean;
  resultActions?: ActionResult[]
}

export interface ApplicationActionEvent {
  action: ApplicationAction;
  application: any;
  payload?: any;
}
