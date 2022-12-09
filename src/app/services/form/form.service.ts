import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

import {validateField} from "../../components/Forms/validations-funtions";
import {Form} from "../../components/Forms/model/Form";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() {
  }

  public getForm(formModel: Form): FormGroup {
    const group: any = {}
    formModel.steps.forEach(step => {
      const stepGroup: any = {};
      step.blocks.forEach(block => {
        block.fields.forEach(field => {
          stepGroup[field.name] = field.validation ? new FormControl(field.value, validateField(field)) : new FormControl(field.value);
        });
      });
      group[step.name] = new FormGroup(stepGroup);
    });
    return new FormGroup(group);
  }

}
