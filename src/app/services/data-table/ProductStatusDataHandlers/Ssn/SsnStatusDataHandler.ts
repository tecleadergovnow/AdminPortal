import {ProductStatusDataHandler} from "../ProductStatusDataHandler";
import {DataColumn, DataColumnType} from "../../../../components/data-table/models/data-column";

export abstract class SsnStatusDataHandler extends ProductStatusDataHandler {
  protected commonColumns: DataColumn[] = [
    {
      name: "dateOfApply",
      label: "Date",
      type: DataColumnType.Date,
    },
    {
      name: "name",
      label: "Name",
      type: DataColumnType.Text,
    },
    {
      name: "phone",
      label: "Phone",
      type: DataColumnType.Text,
    },
    {
      name: "email",
      label: "Email",
      type: DataColumnType.Text,
    },
    {
      name: "type",
      label: "Type",
      type: DataColumnType.Text,
    },
    {
      name: "id",
      label: "Application Id",
      type: DataColumnType.Text,
    },
    {
      name: "status",
      label: "Status",
      type: DataColumnType.Text,
    },
    {
      name: "price",
      label: "Price Paid",
      type: DataColumnType.Text,
    },
    {
      name: "tags",
      label: "Tags",
      type: DataColumnType.Label,
    },
  ];

  protected getAllCommon(): DataColumn[]{
    return this.commonColumns.concat([
      {
        name:"actions",
        label:"Actions",
        type: DataColumnType.ActionList
      }
    ]);
  }
}
