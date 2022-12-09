import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ApplicationAction, ApplicationActionEvent, ProductStatus} from "../models/product-status";
import {DataColumn, DataColumTypeOptions} from "../models/data-column";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {AppDataTable} from "../../../products/model/AppDataTable";
import {DynamicAction, PRODUCTS_DYNAMIC_ACTIONS} from "../../../services/data-table/DynamicActions/DynamicActions";

@Component({
  selector: 'app-main-product-manager',
  templateUrl: './main-product-manager.component.html',
  styleUrls: ['./main-product-manager.component.scss']
})
export class MainProductManagerComponent implements OnInit, OnChanges {
  @Input() product?: string;
  @Input() statuses?: ProductStatus[];
  @Input() activeStatus?: ProductStatus;
  @Input() statusDataColumns?: DataColumn[];
  @Input() applications: AppDataTable[] = [];
  @Input() loading: boolean = false;
  @Output() productStatusChange = new EventEmitter<ProductStatus>()
  @Output() applicationAction = new EventEmitter<ApplicationActionEvent>();
  public DataColumType = new DataColumTypeOptions();

  displayedColumns?: string[];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.buildDisplayedColumns();
  }

  ngOnInit(): void {
    this.buildDisplayedColumns();
  }

  buildDisplayedColumns() {
    this.displayedColumns = this.statusDataColumns?.map(column => {
      return column.name
    })
  }

  statusChange(event: MatTabChangeEvent) {
    // @ts-ignore
    this.productStatusChange.emit(this.statuses[event.index])
  }

  triggerApplicationAction(action: ApplicationAction, application: any) {
    this.applicationAction.emit({
      action: action,
      application: application,
    });
  }

  checkVisibleAction(action: string, application: any): boolean {
    if (this.product && this.product in PRODUCTS_DYNAMIC_ACTIONS) {
      // @ts-ignore
      const dynamicActions: DynamicAction[] = PRODUCTS_DYNAMIC_ACTIONS[this.product];
      const dynamicAction = dynamicActions.find(c => c.action === action);
      if (dynamicAction) {
        return dynamicAction.isVisible(application);
      }
    }
    return true;
  }
}
