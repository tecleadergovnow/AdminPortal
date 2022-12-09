import {ExternalSelect} from "./ExternalSelect";
import {getCountries} from "../../../helpers/countries";

export class CountrySelect extends ExternalSelect {
  constructor(options: {}) {
    super(options);
    this.controlType = 'dropdown'
  }

  protected initOptions(): void {
    const countries = getCountries();
    this.options = countries.map(c => {
      return {label: c.name, value: c.code};
    })
    this.value = 'US';
  }
}
