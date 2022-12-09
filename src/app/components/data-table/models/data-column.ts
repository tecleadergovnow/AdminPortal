export interface DataColumn {
  name: string;
  label: string;
  type: DataColumnType;
  icon?: string,
  actionButton?: DataColumnActionButton;
  labels?: string[];
}

export interface DataColumnActionButton {
  label: string;
  action: string;
  icon?: string;
  disabled?: boolean;
  toggleDisabled?: (disabled: boolean) => any
}

export enum DataColumnType {
  Text, Icon, Link, Button, Label, ActionList, Date, DateTime
}
export class DataColumTypeOptions{
  Text = DataColumnType.Text;
  Icon= DataColumnType.Icon;
  Link = DataColumnType.Link;
  Button = DataColumnType.Button;
  Label = DataColumnType.Label;
  ActionList = DataColumnType.ActionList;
  Date = DataColumnType.Date;
  DateTime = DataColumnType.DateTime;
}
