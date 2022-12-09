import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {MatSelectChange} from "@angular/material/select";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {Field} from "../model/Field";
import {OptionsInterface, ValidationErrorResult} from "../model/FormModelInterface";

@Component({
  selector: 'app-form-field-switch',
  templateUrl: './form-field-switch.component.html',
  styleUrls: ['./form-field-switch.component.scss'],

})
export class FormFieldSwitchComponent implements OnInit, AfterViewInit {
  @Input() field!: Field<any>;
  @Input() form!: FormGroup;
  formGroup!: FormGroup;
  @Input() groupName!: string;
  @Output() fieldChange = new EventEmitter<Field<any>>();

  constructor() {
  }

  ngAfterViewInit(): void {
    if (this.field && this.field.visible && this.field.onChange && this.field.onChange.length > 0) {
         this.fieldChange.emit(this.field);
    }
  }

  ngOnInit(): void {
    this.formGroup = this.form.get(this.groupName) as FormGroup;
  }

  showedError(): boolean {
    const control = this.formGroup.controls[this.field.name];
    if (!control) return false;
    return control.dirty || control.touched;
  }

  error(): ValidationErrorResult | undefined {
    const control = this.formGroup.controls[this.field.name];
    if (control) {
      if (control.errors)
        return control.errors as ValidationErrorResult;
      return undefined;
    }
    return undefined;
  }

  toggleChange(event: MatButtonToggleChange, field: Field<any>) {
    field.value = event.value;
    this.fieldChange.emit(field);
  }

  selectChange(event: MatSelectChange, field: Field<any>) {
    field.value = event.value;
    this.fieldChange.emit(field);
  }

  getDynamicOptionValue(option: OptionsInterface) {
    if (option.valueAutoFill && option.valueAutoFill.length > 0) {
      const dynamic = this.getDynamicValue(option.valueAutoFill);
      if (dynamic) {
        return dynamic;
      }
    }
    return option.value;
  }

  private getDynamicValue(fields: string[]): string | undefined {
    let dynamicLabel = '';
    fields.forEach(c => {
      const control = this.formGroup.controls[c];
      if (control && control.value) {
        dynamicLabel += control.value + ' '
      }
    });
    if (dynamicLabel !== '') {
      return dynamicLabel.trim()
    }
    return undefined;
  }

  getDynamicOptionLabel(option: OptionsInterface) {
    if (option.valueAutoFill && option.valueAutoFill.length > 0) {
      const dynamic = this.getDynamicValue(option.valueAutoFill);
      if (dynamic) {
        return dynamic;
      }
    }
    return option.label;
  }


  dateFieldChange(field: Field<any>) {
    this.fieldChange.emit(field);
  }

  textBoxChange(field: Field<any>) {
    this.fieldChange.emit(field);
  }
}
