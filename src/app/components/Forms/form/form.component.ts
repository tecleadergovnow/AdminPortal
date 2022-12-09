import {AfterContentInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Subject} from "rxjs";
import {takeUntil, tap} from "rxjs/operators";
import {Screen} from "../../../helpers/screen";
import {Form} from "../model/Form";
import {FormStep} from "../model/FormStep";
import {Field} from "../model/Field";
import {ScreenService} from "../../../services/screen/screen.service";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy, AfterContentInit {
  unsubscribe = new Subject();
  @Input() model!: Form;
  @Input() form!: FormGroup;
  activeStep!: FormStep;
  @Output() fieldFormChange = new EventEmitter<Field<any>>();
  @Output() finalize = new EventEmitter();
  contentInit = false;
  titleStep: string | undefined = undefined;
  descriptionStep: string | undefined;
  activeFormGroup: FormGroup | undefined;
  screen: Screen = Screen.Mini;

  constructor(
    private screenService: ScreenService) {
  }


  ngAfterContentInit(): void {
    this.contentInit = true;
  }


  ngOnInit(): void {
    this.activeStep = this.model.steps[0];
    this.activeFormGroup = this.form.get(this.activeStep.name) as FormGroup
    this.screenService.onScreenChange().pipe(
      tap(screen => {
        this.screen = screen;
      }),
      takeUntil(this.unsubscribe)
    ).subscribe({});

  }

  nextStep() {
    let valid = true;
    if (this.activeFormGroup) {
      this.activeStep.blocks.forEach(c => {
        c.fields.forEach(f => {
          const control = this.activeFormGroup?.controls[f.name];
          control?.updateValueAndValidity();
          if (control?.valid === false) {
            valid = false;
            control.markAsTouched();
          }
        });
      });
    }
    if (valid) {
      this.finalize.emit();
    }
  }

  private scrollTop(){
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 25); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 10);
  }

  fieldFormChangeEvent(field: Field<any>){
    this.fieldFormChange.emit(field);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }
}
