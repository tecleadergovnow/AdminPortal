import {Injectable, OnDestroy, OnInit,} from '@angular/core';
import {Screen} from "../../helpers/screen";
import {Subject} from "rxjs";
import {Observable} from "rxjs";
import {MediaObserver} from '@angular/flex-layout';
import {map, takeUntil} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class ScreenService implements OnDestroy{
  private unsubscribe = new Subject();

  constructor(private mediaObserver: MediaObserver) {
  }


  public onScreenChange(): Observable<Screen> {
    return this.mediaObserver.asObservable().pipe(
      map(changes => {
        let screen = Screen.Mini;
        if (changes.length > 0) {
          const media = changes[0];
          if (media.mqAlias === 'xs') {
            screen = Screen.Mini;
          } else if (media.mqAlias === 'sm') {
            screen = Screen.Middle
          } else {
            screen = Screen.Full;
          }
        }
        return screen;
      }),
      takeUntil(this.unsubscribe)
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }


}
