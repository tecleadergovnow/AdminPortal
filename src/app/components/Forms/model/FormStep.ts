import {FormStepBlock} from "./FormStepBlock";

export class FormStep {
  name: string;
  label: string;
  description: string;
  index: number;
  blocks: FormStepBlock[];
  active: boolean;
  completed: boolean;


  constructor(options: {
    name?: string;
    label?: string;
    description?: string
    index?: number;
    blocks?: FormStepBlock[];
  } = {}) {
    this.name = options.name || '';
    this.label = options.label || '';
    this.description = options.description || '';
    this.index = options.index === undefined ? 1 : options.index;
    this.blocks = options.blocks || [];
    this.active = false;
    this.completed = false;
  }
}
