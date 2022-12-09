import {countries} from "countries-list";

export interface Country {
  code: string;
  name: string;
}

export function getCountries(): Country[] {
  const dataCountries = Object.entries(countries);
  return dataCountries.map(data => {
    return {
      code: data[0],
      name: data[1].name,
    };
  });
}
