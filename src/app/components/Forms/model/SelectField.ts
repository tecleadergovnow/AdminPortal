import {Field} from "./Field";

export class SelectField extends Field<string> {
  override controlType = "dropdown";
}
