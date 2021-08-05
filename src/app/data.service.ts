import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn:'root'})

export class DataService {
  constructor () {}

  username: string = "";
  usernameSub = new BehaviorSubject<string>(this.username);
  getUsername = this.usernameSub.asObservable();

  transferUsername (username: string) {
    this.username = username;
    this.usernameSub.next(this.username);
  }

}
