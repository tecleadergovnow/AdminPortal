import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ShowConditional} from "../show-conditional";
import {FormStepBlock} from "../model/FormStepBlock";
import {Field} from "../model/Field";
@Component({
  selector: 'app-form-step-block',
  templateUrl: './form-step-block.component.html',
  styleUrls: ['./form-step-block.component.scss']
})
export class FormStepBlockComponent extends ShowConditional implements OnInit, OnChanges {
  @Input() block!: FormStepBlock;
  @Input() index: number = 0;
  @Input() groupName!: string;
  @Input() form!: FormGroup;

  formGroup!: FormGroup;
  @Output() fieldBlockChange = new EventEmitter<Field<any>>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initGroup()
  }

  initGroup() {
    if (this.groupName) {
      this.formGroup = this.form.get(this.groupName) as FormGroup;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initGroup();
  }

  fieldChange(field: Field<any>){
    this.fieldBlockChange.emit(field);
  }
}
