import {Field} from "./Field";

export class ToggleField extends Field<string | number | boolean> {
  override controlType = 'toggle'
}
