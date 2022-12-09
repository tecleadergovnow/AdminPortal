import {ssnStatusDataColumnsHandler} from "./Ssn/SsnStatusDataHandlerFactory";
import {ProductStatusDataHandler} from "./ProductStatusDataHandler";

export function productStatusDataHandlerFactory(product: string, status: string): ProductStatusDataHandler | undefined {
  let handler = undefined;
  switch (product) {
    case "SSN":
      handler = ssnStatusDataColumnsHandler(status);
      break;
  }
  return handler;
}


