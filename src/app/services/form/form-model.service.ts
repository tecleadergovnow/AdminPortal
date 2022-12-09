import {Injectable} from '@angular/core';

import * as createAppSsnNew from '../../json/ssn/new.json';
import * as createAppSsnReplace from '../../json/ssn/replace.json';
import * as ssnCommon from '../../json/ssn/common.json';
import {ApplicationSsnType} from "../../products/model/ApplicationSsnType";
import {Form} from "../../components/Forms/model/Form";
import {
  FieldInterface,
  FieldValidationInterface, FieldValidationPatternInterface, FieldValidationRequiredInterface,
  FormJsonInterface,
  ValidationInterface
} from "../../components/Forms/model/FormModelInterface";
import {FieldValues} from 'src/app/components/Forms/model/Field';
import {FormStep} from "../../components/Forms/model/FormStep";
import {FormStepBlock} from "../../components/Forms/model/FormStepBlock";
import {TextField} from "../../components/Forms/model/TextField";
import {ToggleField} from "../../components/Forms/model/ToggleField";
import {CountrySelect} from "../../components/Forms/model/CountrySelect";
import {StateSelect} from "../../components/Forms/model/StateSelect";
import {DateField} from "../../components/Forms/model/DateField";
import {SelectField} from "../../components/Forms/model/SelectField";
import {CheckboxField} from "../../components/Forms/model/CheckboxField";
import {ApplicationSsn} from "../../products/model/Application";


@Injectable({
  providedIn: 'root'
})
export class FormModelService {

  constructor() {
  }

  public getAppFormModel(app: any): Form | undefined {
    const values: FieldValues = {};
    for (const [key, value] of Object.entries(app)) {
      if (value !== null && value !== undefined) {
        values[key] = value
      }
    }
    switch (app.productId) {
      case "SSN":
        return this.getCreateAppSsnFormModel(app, values);
      default:
        return undefined;
    }
  }


  private getCreateAppSsnFormModel(app: ApplicationSsn, values?: FieldValues): Form {
    let formData: any;
    if (app.applicationSsnType === ApplicationSsnType.Replace) {
      formData = createAppSsnReplace;
    } else if (app.applicationSsnType === ApplicationSsnType.New) {
      formData = createAppSsnNew;
    } else if (app.applicationSsnType === ApplicationSsnType.Change) {
      formData = createAppSsnNew;
    } else {
      formData = createAppSsnNew;
    }
    const data = {...formData, ...ssnCommon};
    return this.getForm(data, values);
  }


  private getForm(formData: FormJsonInterface, values: FieldValues | undefined): Form {
    const data = formData.form;
    return new Form({
      name: data.name,
      label: data.label,
      helperOn: data.helperOn,
      submitBtn: data.submitBtn,
      steps: data.steps.map((s) => {
        return new FormStep(
          {
            index: s.index,
            name: s.name,
            label: s.label,
            description: s.description,
            blocks: s.blocks.map(b => {
              return new FormStepBlock({
                name: b.name,
                label: b.label,
                description: b.description,
                showCondition: b.showCondition,
                visible: b.visible,
                fields: b.fields.map(f => {
                  let fvalue = f.value;
                  if (values) {
                    const cvalue = values[f.name];
                    if (cvalue !== undefined && cvalue !== null) {
                      fvalue = cvalue;
                    }
                  }
                  const options = {
                    value: fvalue,
                    name: f.name,
                    label: f.label,
                    help: f.help,
                    required: f.required,
                    type: f.type,
                    options: f.options,
                    showCondition: f.showCondition,
                    validation: this.getFieldValidation(f, formData.validations),
                    maxLength: f.maxLength,
                    onChange: f.onChange,
                    visible: f.visible
                  }
                  switch (f.type) {
                    case 'textbox':
                      return new TextField(options);
                    case 'toggle':
                      return new ToggleField(options);
                    case 'country':
                      return new CountrySelect(options);
                    case 'state':
                      return new StateSelect(options);
                    case 'date':
                      return new DateField(options);
                    case 'dropdown':
                      return new SelectField(options);
                    case 'checkbox':
                      return new CheckboxField(options);
                    default:
                      return new TextField(options);
                  }
                })
              });
            })
          }
        );
      })
    });
  }

  private getFieldValidation(field: FieldInterface, validations?: ValidationInterface): FieldValidationInterface | undefined {
    if (field.required !== undefined && field.required) {
      return {
        validationRequired: {name: "required", message: "Required"},
        validationPattern: this.geFieldValidationPattern(field, validations)
      };
    }
    if (validations) {
      if (validations.fields[field.name]) {
        // @ts-ignore
        const val1: FieldValidationInterface = {
          validationRequired: this.getFieldValidationRequired(field, validations),
          validationPattern: this.geFieldValidationPattern(field, validations)
        }
        return val1;
      }
    }
    return undefined;
  }

  private getFieldValidationRequired(field: FieldInterface, validations?: ValidationInterface): FieldValidationRequiredInterface | undefined {
    if (validations && validations.fields[field.name] && validations.fields[field.name].validationRequired) {
      const val = validations.fields[field.name].validationRequired;
      if (val) {
        val.message = validations.messages[val.name];
        return val;
      }
    }
    return undefined;
  }

  private geFieldValidationPattern(field: FieldInterface, validations?: ValidationInterface): FieldValidationPatternInterface | undefined {
    if (validations && validations.fields[field.name]) {
      return validations.fields[field.name].validationPattern
    }
    return undefined;
  }
}
