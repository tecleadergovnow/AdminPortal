export interface ActionResult {
  action: ActionResultAction;
  message?: string;
}

export enum ActionResultAction {
  ShowMessage, Reload
}
