import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InContentComponent} from "./components/layouts/in-content/in-content.component";
import {AuthGuard} from "./services/security/auth.guard";
import {OutContentComponent} from "./components/layouts/out-content/out-content.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/main-modules/global/global.module').then(m => m.GlobalModule),
    component: OutContentComponent
  },
  {
    path: 'search',
    loadChildren: () => import('../app/main-modules/search-engine/search-engine.module').then(m => m.SearchEngineModule),
    component: InContentComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('../app/products/products.module').then(m => m.ProductsModule),
    component: InContentComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
