import {Injectable} from '@angular/core';
import * as signalR from "@microsoft/signalr";
import {HttpTransportType, HubConnection} from "@microsoft/signalr";
import {environment} from "../../../environments/environment";
import {from, Observable, Subject, Subscription, takeUntil, tap} from "rxjs";
import {FormProcessed} from "../../products/model/FormProcessed";


@Injectable({
  providedIn: 'root'
})
export class ProcessingFormService {

  private formProcessedSubject = new Subject<FormProcessed>();
  private hubConnection: HubConnection;
  private subs!: Subscription;


  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.apiUrl + 'processingForm', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      }).build();
  }

  private startObserver(): Observable<any> {
    return from(this.hubConnection.start());
  }

  public start() {
    this.subs = this.startObserver().pipe(
      tap(() => {
        console.log('Hub connection success');
        this.hubConnection.on("processedForm", (response: FormProcessed) => {
          console.log('On: ', response);
          this.formProcessedSubject.next(response);
        });
      }),
    ).subscribe();
  }

  public stop() {
    this.hubConnection.stop().then(() => console.log('Hub connection stopped'));
    this.subs.unsubscribe();
    this.hubConnection.off('processedForm');
  }

  public onFormProcessed(): Observable<FormProcessed> {
    return this.formProcessedSubject.asObservable();
  }

}
