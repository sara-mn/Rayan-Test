import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {AuthActionTypes, LoginAction, LoginFailureAction, LoginSuccessAction} from "../actions/auth.action";
import {catchError, map, mergeMap, of, switchMap} from "rxjs";
import {Token} from "../models/auth";
import {AuthService} from "../../services/apis/authApi/auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {

  @Effect() login$ = this.actions$
    .pipe(
      ofType<LoginAction>(AuthActionTypes.LOGIN),
      switchMap((data: LoginAction) => this.authApi.login<Token>(data.payload)
        .pipe(
          map((token: Token) => {
            localStorage.setItem('token', token.token);
            return new LoginSuccessAction(token)
          }),
          mergeMap(() => of(this.router.navigateByUrl('rayan/list'))),
          catchError((error: Error) => {
            return of(new LoginFailureAction(error))
          })
        ))
    )

  constructor(private actions$: Actions,
              private authApi: AuthService,
              private router: Router) {
  }
}
