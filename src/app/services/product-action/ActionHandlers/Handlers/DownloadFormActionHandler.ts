import {IApplicationActionHandler} from "../IApplicationActionHandler";
import {ApplicationActionEvent} from "../../../../components/data-table/models/product-status";
import {Observable, tap} from "rxjs";
import {DOWNLOAD_FORM} from "../../../../components/data-table/models/ApplicationActions";
import {BackendService} from "../../../backend/backend.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DownloadFormActionHandler implements IApplicationActionHandler{
  constructor(private backend: BackendService) {
  }

  accept(product: string, actionEvent: ApplicationActionEvent): boolean {
    return actionEvent.action.action === DOWNLOAD_FORM;
  }

  handle(product: string, actionEvent: ApplicationActionEvent): Observable<any> {
    return this.backend.downloadForm({
      applicationId: actionEvent.application.id,
      product: product,
      actionType: DOWNLOAD_FORM,
    }).pipe(
      tap((response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url= window.URL.createObjectURL(blob);
        window.open(url);
      })
    );
  }
}
