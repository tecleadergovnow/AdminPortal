import {FormGroup} from "@angular/forms";
import { ShowConditionInterface } from "./model/FormModelInterface";
import {diffYears, isValidDate} from "../../helpers/age";


export class ShowConditional {
  public checkShowed(conditions: ShowConditionInterface[], formGroup: FormGroup): boolean {
    if (conditions.length === 0) return true;
    for (let i = 0; i < conditions.length; i++) {
      const condition = conditions[i];
      if (!condition.type) return this.checkDefaultCondition(condition, formGroup);
      else if (condition.type === 'dateLessThan' || condition.type === 'dateGreaterThan')
        return this.checkDateCondition(condition, formGroup);
      else if (condition.type === 'different')
        return this.checkDifferentCondition(condition, formGroup)
      return true;
    }
    return true;
  }

  private checkDifferentCondition(condition: ShowConditionInterface, formGroup: FormGroup): boolean {
    const formField = formGroup.get(condition.field);
    if (!formField) return true;
    const cfv = formField.value.toString();
    const ccv = condition.value.toString();
    if (cfv === ccv){
      return false;
    }

    return true;
  }

  private checkDefaultCondition(condition: ShowConditionInterface, formGroup: FormGroup): boolean {
    const formField = formGroup.get(condition.field);
    if (!formField) return true;

    if (formField.value !== condition.value)
      return false;
    return true;
  }

  private checkDateCondition(condition: ShowConditionInterface, formGroup: FormGroup): boolean {
    const formField = formGroup.get(condition.field);
    if (!formField) return true;
    const date = new Date(formField.value);
    if (!isValidDate(date)) {
      return false;
    }
    const years = diffYears(date);
    if (condition.type === 'dateLessThan')
      return years <= condition.value;
    else if (condition.type === 'dateGreaterThan')
      return years >= condition.value;
    return false;
  }

}
