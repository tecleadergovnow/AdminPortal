import {ProductSsnType} from "./ProductSsnType";
import {AppDataTable} from "./AppDataTable";

export interface AppSsnDataTable extends AppDataTable{
  type: string;
  productSsnType: ProductSsnType;
}
