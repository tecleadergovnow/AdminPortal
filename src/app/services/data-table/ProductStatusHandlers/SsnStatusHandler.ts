import {ProductStatusHandler} from "./ProductStatusHandler";
import {ProductStatus} from "../../../components/data-table/models/product-status";
import {
  CONFIRM,
  DOWNLOAD_FORM,
  EDIT_INFORMATION,
  REGENERATE_FORM, SEND_STATUS_EMAIL
} from "../../../components/data-table/models/ApplicationActions";
import {BackendService} from "../../backend/backend.service";
import {Inject, Injectable} from "@angular/core";
import {
  SSN_COMPLETE,
  SSN_INVALID_ADDRESS,
  SSN_PENDING_QUESTIONNAIRE,
  SSN_PENDING_SIGNATURE,
  SSN_PENDING_VALIDATION, SSN_PROCESSING_SHIPMENT
} from "../Statuses/SsnStatuses";
import {ActionResultAction} from "../../../products/model/ActionResult";
import {
  CONFIRM_ACTION,
  DOWNLOAD_FORM_ACTION, DOWNLOAD_PACKAGE_ACTION,
  EDIT_INFORMATION_ACTION,
  REGENERATE_FORM_ACTION, REGENERATE_LABELS_ACTION, REGENERATE_PACKAGE_ACTION,
  SEND_STATUS_EMAIL_ACTION
} from "../ApplicationActionObjects";


@Injectable({
  providedIn: 'root',
})
export class SsnStatusHandler extends ProductStatusHandler {

  constructor(private backend: BackendService) {
    super();
  }

  getProductStatuses(): ProductStatus[] {
    return [
      {
        name: SSN_INVALID_ADDRESS,
        label: "Invalid Address",
        applicationActions:[
          SEND_STATUS_EMAIL_ACTION,
          EDIT_INFORMATION_ACTION
        ]
      },
      {
        name: SSN_PENDING_SIGNATURE,
        label: "Pending Signature",
        applicationActions:[
          SEND_STATUS_EMAIL_ACTION,
          EDIT_INFORMATION_ACTION,
          REGENERATE_FORM_ACTION,
          DOWNLOAD_FORM_ACTION,
        ]
      },
      {
        name: SSN_PENDING_QUESTIONNAIRE,
        label: "Pending Questionnaire",
        applicationActions:[
          SEND_STATUS_EMAIL_ACTION,
        ]
      },
      {
        name: SSN_PENDING_VALIDATION,
        label: "Validation",
        applicationActions:[
          EDIT_INFORMATION_ACTION,
          REGENERATE_LABELS_ACTION,
          REGENERATE_PACKAGE_ACTION,
          DOWNLOAD_PACKAGE_ACTION,
          CONFIRM_ACTION,
        ]
      },
      {
        name: SSN_PROCESSING_SHIPMENT,
        label: "Processing Shipment",
        applicationActions:[]
      },
      {
        name: SSN_COMPLETE,
        label: "Complete",
        applicationActions:[
          SEND_STATUS_EMAIL_ACTION,
          DOWNLOAD_FORM_ACTION,
        ]
      },
    ];
  }
}
