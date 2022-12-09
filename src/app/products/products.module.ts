import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsRoutingModule} from './products-routing.module';
import {ComponentsModule} from "../components/components.module";
import {ProductPageComponent} from './product-page/product-page.component';
import { EditApplicationComponent } from './edit-application/edit-application.component';

@NgModule({
  declarations: [
    ProductPageComponent,
    EditApplicationComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ComponentsModule
  ],

})
export class ProductsModule {
}
