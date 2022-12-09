import {ExternalSelect} from "./ExternalSelect";
import {UsaStates} from "usa-states";

export class StateSelect extends ExternalSelect {
  constructor(options:{}) {
    super(options);
    this.controlType = 'dropdown'
  }

  protected initOptions(): void {
    const states = new UsaStates().states;
    this.options = states.map(c => {
      return {label: c.name, value: c.abbreviation};
    })
  }

}
