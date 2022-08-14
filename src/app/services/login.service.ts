import { Injectable } from '@angular/core';
import {Store} from "@ngrx/store";
import { AppState } from '../store/app.state';
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private  store : Store<AppState>) { }

  isUserLoggedIn() : Observable<boolean>{
    return this.store.select(store => store.auth)
      .pipe(map((auth) => {
        const expirationDate = new Date(auth.token.expiration);
        const currentDate  = new Date();
        return expirationDate < currentDate
      }))
  }
}
