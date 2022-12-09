import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BackendService} from "../../services/backend/backend.service";
import {ToastService} from "../../services/toast.service";
import {finalize, Subject, take, tap} from "rxjs";
import {Form} from "../../components/Forms/model/Form";
import {FormGroup} from "@angular/forms";
import {FormModelService} from "../../services/form/form-model.service";
import {FormService} from "../../services/form/form.service";
import {FieldValues} from "../../components/Forms/model/Field";
import {AdminActionDto} from "../../services/product-action/ActionHandlers/AdminActionDto";
import {EDIT_INFORMATION} from "../../components/data-table/models/ApplicationActions";

@Component({
  selector: 'app-edit-application',
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.scss']
})
export class EditApplicationComponent implements OnInit, OnDestroy {
  unsubscribe = new Subject();
  product!: string;
  appId!: number
  loading: boolean = false;
  app: any;
  formModel!: Form;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backend: BackendService,
    private toast: ToastService,
    private formModelService: FormModelService,
    private formService: FormService
  ) {
    const paramId = this.route.snapshot.paramMap.get('id');
    const paramProduct = this.route.snapshot.paramMap.get('product');
    if (paramId && paramProduct) {
      this.appId = parseInt(paramId, 10);
      this.product = paramProduct.toUpperCase();
    }
  }


  ngOnInit(): void {
    if (this.appId && this.product) {
      this.backend.getApplication(this.product, this.appId).pipe(
        tap(app => {
          this.app = app;
          const model = this.formModelService.getAppFormModel(app);
          if (model) {
            const activeStep = model.steps[0];
            activeStep.active = true;
            const form = this.formService.getForm(model);
            this.formModel = model;
            this.form = form;
          }
        })
      ).subscribe();
    } else {
      // router back
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  submitForm() {
    let payload: FieldValues = {};
    for (const [key, value] of Object.entries(this.app)) {
      if (value !== null && value !== undefined) {
        payload[key] = value
      }
    }
    this.formModel.steps.forEach(step => {
      const stepForm = this.form.controls[step.name];
      step.blocks.forEach(block => {
        if (block.visible) {
          block.fields.forEach(field => {
            const value = stepForm?.get(field.name)?.value;
            if (field.visible && value !== null && value !== undefined) {
              const fieldValue = {};
              // @ts-ignore
              fieldValue[field.name] = value;
              payload = {...payload, ...fieldValue};
            }
          });
        }
      });
    });
    const actionDto: AdminActionDto = {
      applicationId: this.appId,
      product: this.product,
      actionType: EDIT_INFORMATION,
      payload: payload
    }
    this.loading = true;
    this.backend.action(actionDto).pipe(
      tap(result => {
        // implement redirect to application current tab
        this.router.navigate(['/products/' + this.product.toUpperCase()])
      }),
      take(1),
      finalize(() => this.loading = false)
    ).subscribe(
      {
        error: (err) => {
          if (err.message) {
            this.toast.error(err.message);
          }
        }
      }
    );
  }

  fieldChange() {

  }
}
