import {Injectable} from '@angular/core';
import {User} from "./UserToken";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  data?: User;

  constructor() {
  }

  public setMetadata(user: User | undefined) {
    this.data = user;
  }

  public hasMetadata(): boolean {
    return !!this.data;
  }

  public getMetadata(): User | undefined {
    return this.data;
  }
}
