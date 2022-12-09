import {Field} from "./Field";

export abstract class ExternalSelect extends Field<string> {
  protected constructor(options:{}) {
    super(options);
    this.initOptions();
  }
  protected abstract initOptions(): void;
}
