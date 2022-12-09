import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductPageComponent} from "./product-page/product-page.component";
import {EditApplicationComponent} from "./edit-application/edit-application.component";

const routes: Routes = [
  {
    path:':product',
    component: ProductPageComponent
  },
  {
    path:':product/edit/:id',
    component: EditApplicationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
