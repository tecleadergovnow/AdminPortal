import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snack: MatSnackBar) { }

  public success(message: string){
    this.snack.open(message, undefined, {
      panelClass: 'toast-success',
      duration: 5000
    })
  }

  public error(message: string){
    this.snack.open(message, undefined, {
      panelClass: 'toast-error',
      duration: 10000
    })
  }
}
