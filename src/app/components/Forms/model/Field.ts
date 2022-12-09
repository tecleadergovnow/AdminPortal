import {
  FieldChangeAction,
  FieldValidationInterface,
  FieldValidationRequiredInterface,
  ShowConditionInterface,
} from "./FormModelInterface";
import {FormGroup} from "@angular/forms";

export class Field<T> {
  value: T | undefined;
  name: string;
  label: string;
  help: string | undefined;
  required: boolean | undefined;
  controlType: string;
  type: string;
  options: { label: string, value: string, valueAutoFill?: string[] }[];
  showCondition: ShowConditionInterface[];
  validation: FieldValidationInterface | undefined;
  maxLength?: number | undefined;
  onChange?: FieldChangeAction[]
  visible: boolean;

  constructor(options: {
    value?: T;
    name?: string;
    label?: string;
    help?: string;
    required?: boolean | undefined;
    controlType?: string;
    type?: string;
    options?: { label: string, value: string, valueAutoFill?: string[] }[];
    showCondition?: ShowConditionInterface[];
    validation?: FieldValidationInterface;
    maxLength?: number | undefined;
    onChange?: FieldChangeAction[],
    visible?: boolean
  } = {}) {
    this.value = options.value;
    this.name = options.name || '';
    this.label = options.label || '';
    this.help = options.help;
    this.required = options.required;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
    this.showCondition = options.showCondition || [];
    this.validation = options.validation;
    this.maxLength = options.maxLength || undefined;
    this.onChange = options.onChange || [];
    this.visible = options.visible === undefined ? true : options.visible
  }
}

export interface FieldValues {
  [name: string]: any;
}
