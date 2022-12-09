import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {diffYears, isValidDate} from "../../helpers/age";
import {Field} from "./model/Field";
import {ValidationErrorResult} from "./model/FormModelInterface";

export function validateField(field: Field<any>): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!field.validation) return null;
    let result = null;
    if (field.validation.validationRequired && validators[field.validation.validationRequired.name]) {
      result = validators[field.validation.validationRequired.name](control, field);
    }
    if(result !== null){
      return result;
    } else if(field.validation.validationPattern){
      return validatePattern(control, field);
    }
    return null;
  };
}

function validatePattern(control: AbstractControl,field: Field<any>): ValidationErrorResult | null {
  const cvalue = control.value;
  if(cvalue === null || cvalue === undefined){
    return  null;
  }
  const value = String(control.value).trim();
  if(value ==='' || value ===' '){
    return null;
  }
  const regExp = new RegExp(field?.validation?.validationPattern?.pattern || "");
  if(!regExp.test(value)){
    return {
      field: field.name,
      message: field?.validation?.validationPattern?.message || ""
    };
  }
  return null;
}

const validators: { [K: string]: Function } = {
  required: requireField,
  conditionalRequired: (control: AbstractControl, field: Field<any>): ValidationErrorResult | null => {
    // @ts-ignore
    if (field.validation.validationRequired.condition.length === 0) return null;
    const formGroup = control.parent as FormGroup;
    if (!formGroup) return null;
    let checkRequired = true;
    // @ts-ignore
    for (let i = 0; i < field.validation.validationRequired.condition.length; i++) {
      // @ts-ignore
      const condition = field.validation.validationRequired.condition[i];
      // @ts-ignore
      const formField = formGroup.get(condition.field);
      if (!formField) {
        checkRequired = false;
        break;
      }
      if (condition.type === undefined) {
        if (formField.value !== condition.value) {
          checkRequired = false;
          break;
        }
      } else if (condition.type === 'dateLessThan') {
        if (!checkDateLessThan(formField.value, condition.value)) {
          checkRequired = false;
          break;
        }
      } else if (condition.type === 'different') {
        if (formField.value === condition.value) {
          checkRequired = false;
          break
        }
      }
    }
    if (checkRequired)
      return requireField(control, field);
    return null;
  },
  terms: (control: AbstractControl, field: Field<any>): ValidationErrorResult | null => {
    if (control.value !== true) {
      return buildMessage(field);
    }
    return null;
  }
};


function checkDateLessThan(value: any, conditionValue: any): boolean {
  const date = new Date(value);
  if (!isValidDate(date)) {
    return false;
  }
  const years = diffYears(date);
  return years <= conditionValue;
}


function requireField(control: AbstractControl, field: Field<any>): ValidationErrorResult | null {
  if (control.value === undefined || control.value === '' || control.value === null) {
    return buildMessage(field);
  }
  return null;
}

function buildMessage(field: Field<any>): ValidationErrorResult {
  return {
    field: field.name,
    message: field.validation ? field?.validation?.validationRequired?.message || '' : ''
  };
}
