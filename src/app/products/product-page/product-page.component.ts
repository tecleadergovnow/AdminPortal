import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Products} from "../model/Products";
import {DataTableService} from "../../services/data-table/data-table.service";
import {BackendService} from "../../services/backend/backend.service";
import {finalize, Subject, Subscription, take, takeUntil, tap} from "rxjs";
import {ApplicationActionEvent, ProductStatus} from "../../components/data-table/models/product-status";
import {DataColumn} from "../../components/data-table/models/data-column";
import {AppDataTable} from "../model/AppDataTable";
import {ProductActionService} from "../../services/product-action/product-action.service";
import {ToastService} from "../../services/toast.service";
import {ProductResultActionService} from "../../services/product-action/product-result-action.service";
import {ProcessingFormService} from "../../services/real-time/processing-form.service";
import {FormProcessed} from "../model/FormProcessed";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  unsubscribe = new Subject();
  validProduct: boolean;
  product?: string;
  statuses?: ProductStatus[];
  activeStatus?: ProductStatus;
  statusDataColumns?: DataColumn[];
  data: AppDataTable[] = [];
  loading: boolean = false;
  formProcessedSubscription!: Subscription;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataTableService: DataTableService,
    private backend: BackendService,
    private actionHandler: ProductActionService,
    private toast: ToastService,
    private resultActionService: ProductResultActionService,
    private processingFormService: ProcessingFormService
  ) {
    const product = this.route.snapshot.paramMap.get('product');
    this.validProduct = product !== undefined && product !== null && Products.includes(product.toLowerCase());
    if (this.validProduct) {
      this.product = product?.toUpperCase();
    }
    if (this.validProduct && this.product) {
      this.statuses = dataTableService.getProductStatuses(this.product);
    }
    if (this.statuses) {
      this.activeStatus = this.statuses[0];
    }
  }

  ngOnInit(): void {
    this.loadApplications();
    this.dataTableService.onReload().pipe(
      tap(() => {
        this.loadApplications();
      }),
      takeUntil(this.unsubscribe)
    ).subscribe();


    this.processingFormService.start();
    this.formProcessedSubscription = this.processingFormService.onFormProcessed().pipe(
      tap((response: FormProcessed) => {
        console.log(response);
        const find = this.data.find(c => c.id == response.applicationId)
        if (find) {
          find.tags = response.packageStatus;
        }
      }),
      takeUntil(this.unsubscribe)
    ).subscribe();

  }

  private loadApplications() {
    if (this.activeStatus && this.product) {
      this.data = [];
      this.statusDataColumns = this.dataTableService.getProductStatusDataColumns(this.product, this.activeStatus.name);
      this.loading = true;
      this.backend.getApplications({
        status: this.activeStatus.name,
        product: this.product,
        pageIndex: 0,
        pageSize: 25,
      }).pipe(
        tap((apps: AppDataTable[]) => {
          this.data = apps;
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
  }

  productStatusChange(status: ProductStatus) {
    this.activeStatus = status
    this.loadApplications();
  }

  applicationAction(actionEvent: ApplicationActionEvent) {
    if (this.product) {
      this.loading = true;
      this.actionHandler.handleAction(this.product, actionEvent).pipe(
        tap((actionResult: any) => {
          this.resultActionService.handleResultAction(<string>this.product, actionEvent, actionResult);
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
  }


  ngOnDestroy(): void {
    this.processingFormService.stop();
    this.unsubscribe.next(false);
    this.unsubscribe.complete();
    console.log(this.processingFormService);
  }

}
