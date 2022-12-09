export interface FormJsonInterface {
  form: FormInterface;
  validations: ValidationInterface;
}

export interface FormInterface {
  name: string;
  label: string;
  submitBtn: string;
  helperOn: boolean;
  steps: StepInterface[]
}

export interface StepInterface {
  name: string;
  label: string;
  description: string;
  index: number;
  blocks: BlockInterface[];
}

export interface BlockInterface {
  name: string;
  label: string;
  description: string | undefined;
  fields: FieldInterface[];
  showCondition: ShowConditionInterface[];
  visible?: boolean;
}

export interface FieldInterface {
  value: any;
  name: string;
  label: string;
  help: string | undefined;
  required: boolean | undefined;
  type: string;
  options: OptionsInterface[];
  showCondition?: ShowConditionInterface[];
  validations: FieldValidationRequiredInterface[];
  maxLength?: number | undefined;
  onChange?: FieldChangeAction[],
  visible?: boolean;
}

export interface OptionsInterface {
  label: string;
  value: string
  valueAutoFill?: string[]
}

export interface ShowConditionInterface {
  field: string;
  value: any;
  type: string
}

export interface ValidationInterface {
  fields: FieldsValidationInterface;
  messages: MessagesValidation;
}

export interface FieldsValidationInterface {
  [key: string]: FieldValidationInterface;
}

export interface FieldValidationInterface {
  validationRequired?: FieldValidationRequiredInterface;
  validationPattern?: FieldValidationPatternInterface
}

export interface FieldValidationPatternInterface {
  pattern: string;
  message: string;
}


export interface FieldValidationRequiredInterface {
  name: string;
  conditions?: FieldValidationConditionInterface[];
  message: string;
}

export interface FieldValidationConditionInterface {
  field: string;
  value: any;
  type: string | undefined
}

export interface MessagesValidation {
  [key: string]: string;
}

export interface ValidationErrorResult {
  field: string
  message: string;
}

export interface ConditionInterface {
  field: string;
  value: any;
  type?: string
}

export interface FieldChangeAction {
  name: string;
  fields?: string[];
  blocks?: string[];
  conditions?: ConditionInterface[]
}
