import {FormStep} from "./FormStep";


export class Form {
  name: string;
  label: string;
  submitBtn: string;
  helperOn: boolean;
  steps: FormStep[]

  constructor(options: {
    name?: string;
    label?: string;
    submitBtn?: string;
    helperOn?: boolean;
    steps?: FormStep[];
  } = {}) {
    this.name = options.name || '';
    this.label = options.label || '';
    this.submitBtn = options.submitBtn || 'Submit'
    this.helperOn = options.helperOn || true;
    this.steps = options.steps || [];
  }
}
