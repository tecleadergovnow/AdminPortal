import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {diffYears, isValidDate} from "../../../helpers/age";
import {FormStep} from "../model/FormStep";
import {Field} from "../model/Field";
import {ConditionInterface, FieldChangeAction} from "../model/FormModelInterface";


@Component({
  selector: 'app-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.scss'],

})
export class FormStepComponent implements OnInit, OnChanges {

  @Input() step!: FormStep;
  @Input() form!: FormGroup;
  groupName!: string;
  formGroup!: FormGroup;
  @Output() fieldStepChange = new EventEmitter<Field<any>>();

  constructor() {

  }

  ngOnInit(): void {
    console.log('OnInit FormStep: ', this.step.label);
    this.initGroups();
  }

  initGroups() {
    if (this.step) {
      this.groupName = this.step.name;
      this.formGroup = this.form.get(this.groupName) as FormGroup;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initGroups();
  }

  fieldChange(field: Field<any>) {
    if (this.formGroup) {
      this.checkFieldChangeActions(field);
    }
    this.fieldStepChange.emit(field)
  }

  private checkFieldChangeActions(field: Field<any>) {
    if (field.onChange && field.onChange.length > 0) {
      field.onChange.forEach(action => {
        this.checkFieldChangeAction(action);
      });
    }
  }

  private checkFieldChangeAction(action: FieldChangeAction) {
    let passConditions = true;
    if(action.conditions){
      for (let i = 0; i < action.conditions.length; i++) {
        const condition = action.conditions[i];
        if (!this.checkFieldChangeActionCondition(condition)) {
          passConditions = false;
          break;
        }
      }
    }
    this.executeFieldChangeAction(action, passConditions);
  }

  private executeFieldChangeAction(action: FieldChangeAction, passConditions: boolean) {
    if (action.name === "showFields" && action.fields) {
      this.executeActionShowFields(action.fields, passConditions);
    } else if(action.name === "showBlocks" && action.blocks){
      this.executeActionShowBlocks(action.blocks, passConditions);
    }
  }
  private executeActionShowBlocks(blocks: string[], passConditions: boolean) {
    this.step.blocks.forEach(block => {
      if(blocks.includes(block.name)){
        block.visible = passConditions;
      }
    });
  }

  private executeActionShowFields(fields: string[], passConditions: boolean) {
    this.step.blocks.forEach(block => {
      block.fields.forEach(field=>{
        if(fields.includes(field.name)){
          field.visible = passConditions;
        }
      })
    });
  }

  private checkFieldChangeActionCondition(condition: ConditionInterface): boolean {
    if (!condition.type) return this.checkDefaultCondition(condition, this.formGroup);
    else if (condition.type === 'dateLessThan' || condition.type === 'dateGreaterThan')
      return this.checkDateCondition(condition, this.formGroup);
    else if (condition.type === 'different')
      return this.checkDifferentCondition(condition, this.formGroup)
    return true;
  }

  private checkDefaultCondition(condition: ConditionInterface, formGroup: FormGroup): boolean {
    const formField = formGroup.get(condition.field);
    if (!formField) return false;
    if (formField.value !== condition.value)
      return false;
    return true;
  }

  private checkDifferentCondition(condition: ConditionInterface, formGroup: FormGroup): boolean {
    const formField = formGroup.get(condition.field);
    if (!formField) return false;
    if(!formField.value) return false;
    const cfv = formField.value.toString();
    const ccv = condition.value.toString();
    if (cfv === ccv) {
      return false;
    }

    return true;
  }

  private checkDateCondition(condition: ConditionInterface, formGroup: FormGroup): boolean {
    const formField = formGroup.get(condition.field);
    if (!formField) return false;
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
