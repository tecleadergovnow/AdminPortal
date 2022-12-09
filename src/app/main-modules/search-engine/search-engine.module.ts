import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchEngineRoutingModule } from './search-engine-routing.module';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SearchEngineRoutingModule
  ]
})
export class SearchEngineModule { }
