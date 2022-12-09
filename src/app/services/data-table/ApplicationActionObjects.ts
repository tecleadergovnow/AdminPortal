import {ApplicationAction} from "../../components/data-table/models/product-status";
import {
  CONFIRM,
  DOWNLOAD_FORM,
  EDIT_INFORMATION,
  REGENERATE_FORM, REGENERATE_LABELS, REGENERATE_PACKAGE,
  SEND_STATUS_EMAIL
} from "../../components/data-table/models/ApplicationActions";
import {ActionResultAction} from "../../products/model/ActionResult";

export const SEND_STATUS_EMAIL_ACTION: ApplicationAction = {
  label: "Send Status Email",
  action: SEND_STATUS_EMAIL,
  resultActions: [
    {
      action: ActionResultAction.ShowMessage,
      message: 'The email was sent correctly'
    }
  ]
};

export const EDIT_INFORMATION_ACTION: ApplicationAction = {
  label: "Edit Information",
  action: EDIT_INFORMATION
};

export const REGENERATE_FORM_ACTION: ApplicationAction = {
  label: "Regenerate Form",
  action: REGENERATE_FORM,
  resultActions: [
    {
      action: ActionResultAction.ShowMessage,
      message: 'The form is regenerating please wait'
    },
    {
      action: ActionResultAction.Reload,
    },
  ]
};

export const REGENERATE_LABELS_ACTION: ApplicationAction = {
  label: "Regenerate Labels",
  action: REGENERATE_LABELS,
  resultActions: [
    {
      action: ActionResultAction.ShowMessage,
      message: 'Labels was successfully regenerated. Regenerating package please wait'
    },
    {
      action: ActionResultAction.Reload,
    },
  ]
};

export const REGENERATE_PACKAGE_ACTION: ApplicationAction = {
  label: "Regenerate Package",
  action: REGENERATE_PACKAGE,
  resultActions: [
    {
      action: ActionResultAction.ShowMessage,
      message: 'The package is regenerating please wait'
    },
    {
      action: ActionResultAction.Reload,
    },
  ]
};

export const DOWNLOAD_FORM_ACTION: ApplicationAction = {
  label: "Download Form",
  action: DOWNLOAD_FORM
};
export const DOWNLOAD_PACKAGE_ACTION: ApplicationAction = {
  label: "Download Package",
  action: DOWNLOAD_FORM
};

export const CONFIRM_ACTION: ApplicationAction = {
  label: "Confirm",
  action: CONFIRM,
  resultActions: [
    {
      action: ActionResultAction.ShowMessage,
      message: 'The application was confirmed successfully'
    },
    {
      action: ActionResultAction.Reload,
    },
  ]
};



