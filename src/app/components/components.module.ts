import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolBarComponent} from './tool-bar/tool-bar.component';
import {RouterModule} from "@angular/router";
import {MaterialModule} from "../material/material.module";
import {MainProductManagerComponent} from './data-table/main-product-manager/main-product-manager.component';
import {ColumnTagsComponent} from './data-table/column-tags/column-tags.component';
import {InContentComponent} from './layouts/in-content/in-content.component';
import {OutContentComponent} from './layouts/out-content/out-content.component';
import {FormStepBlockComponent} from "./Forms/form-step-block/form-step-block.component";
import {FormFieldSwitchComponent} from "./Forms/form-field-switch/form-field-switch.component";
import {ReactiveFormsModule} from "@angular/forms";
import {FormStepComponent} from "./Forms/form-step/form-step.component";
import {FormComponent} from "./Forms/form/form.component";


@NgModule({
  declarations: [
    ToolBarComponent,
    MainProductManagerComponent,
    ColumnTagsComponent,
    InContentComponent,
    OutContentComponent,
    FormStepBlockComponent,
    FormFieldSwitchComponent,
    FormStepComponent,
    FormComponent
  ],
  exports: [
    ToolBarComponent,
    MainProductManagerComponent,
    FormStepBlockComponent,
    FormFieldSwitchComponent,
    FormStepComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule {
}
