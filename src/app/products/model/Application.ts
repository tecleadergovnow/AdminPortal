
import {ApplicationSsnType} from "./ApplicationSsnType";

export interface Application {
  id: number;
  productId: string;
  firstName: string;
  lastName: string;
  middleName?: string
}

export interface ApplicationSsn extends Application {
  applicationSsnType: ApplicationSsnType;
}
