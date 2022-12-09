import {Field} from "./Field";
import {ShowConditionInterface} from "./FormModelInterface";

export class FormStepBlock {
  name: string;
  label: string;
  description: string | undefined;
  fields: Field<any>[];
  showCondition: ShowConditionInterface[];
  visible: boolean

  constructor(options: {
    name?: string;
    label?: string;
    description?: string | undefined;
    fields?: Field<any>[];
    showCondition?: ShowConditionInterface[];
    visible?:boolean;
  } = {}) {
    this.name = options.name || '';
    this.description = options.description || '';
    this.label = options.label || '';
    this.fields = options.fields || [];
    this.showCondition = options.showCondition || []
    this.visible = options.visible === undefined ? true : options.visible
  }
}
