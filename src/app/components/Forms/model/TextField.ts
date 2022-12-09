import {Field} from "./Field";

export class TextField extends Field<string> {
  override controlType = "textbox";
}
