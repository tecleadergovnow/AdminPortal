import {ProductStatusDataHandler} from "../ProductStatusDataHandler";
import {SsnSignatureDataHandler} from "./SsnSignatureDataHandler";
import {SsnCompletedDataHandler} from "./SsnCompletedDataHandler";
import {
  SSN_COMPLETE,
  SSN_INVALID_ADDRESS,
  SSN_PENDING_QUESTIONNAIRE,
  SSN_PENDING_SIGNATURE,
  SSN_PENDING_VALIDATION, SSN_PROCESSING_SHIPMENT
} from "../../Statuses/SsnStatuses";
import {SsnInvalidAddressDataHandler} from "./SsnInvalidAddressDataHandler";
import {SsnQuestionnaireDataHandler} from "./SsnQuestionnaireDataHandler";
import {SsnValidationDataHandler} from "./SsnValidationDataHandler";
import {SsnShipmentDataHandler} from "./SsnShipmentDataHandler";

export function ssnStatusDataColumnsHandler(status: string): ProductStatusDataHandler | undefined {
  switch (status){
    case SSN_INVALID_ADDRESS:
      return new SsnInvalidAddressDataHandler();
    case SSN_PENDING_SIGNATURE:
      return new SsnSignatureDataHandler();
    case SSN_PENDING_QUESTIONNAIRE:
      return new SsnQuestionnaireDataHandler();
    case SSN_PENDING_VALIDATION:
      return new SsnValidationDataHandler();
    case SSN_PROCESSING_SHIPMENT:
      return new SsnShipmentDataHandler();
    case SSN_COMPLETE:
      return new SsnCompletedDataHandler();
    default:
      return undefined;
  }
}
