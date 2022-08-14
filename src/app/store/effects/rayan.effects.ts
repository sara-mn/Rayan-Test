import {Actions, Effect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {catchError, map, of, switchMap} from "rxjs";
import {RayanApiService} from "../../services/apis/rayanApi/rayan.api.service";
import {
  ADD_DATA,
  AddRayanAction, FailureAddRayanAction,
  FailureLoadRayanAction,
  LOAD_DATA,
  LoadRayanAction, SuccessAddRayanAction,
  SuccessLoadRayanAction
} from "../actions/rayan.action";
import {GridActionPayload, GridData, Rayan} from "../models/rayan";

@Injectable({
  providedIn: 'root'
})
export class RayanEffects {
  @Effect() loadRayanData$ = this.actions$
    .pipe(
      ofType<LoadRayanAction>(LOAD_DATA),
      switchMap(() => {
          return this.rayanApi.getData<{ data:GridData }>()
            .pipe(
              map((result: { data:GridData }) => {
                const successResult: GridActionPayload = {
                  columns: result.data.columns ?? [],
                  data: result.data.data ?? [],
                  displayedCol:result.data.columns.map(col => col.field)
                }
                return new SuccessLoadRayanAction(successResult)
              }),
              catchError((error: Error) => {
                return of(new FailureLoadRayanAction(error));
              })
            )
        }
      )
    );

  @Effect() addData$ = this.actions$.pipe(
    ofType<AddRayanAction>(ADD_DATA),
    switchMap((data: AddRayanAction) => this.rayanApi.saveNewData(data.payload)
      .pipe(
        map(() => new SuccessAddRayanAction(data.payload)),
        catchError((error: Error) => of(new FailureAddRayanAction(error)))
      )
    )
  )

  constructor(private actions$: Actions,
              private rayanApi: RayanApiService) {
  }
}


interface ResponseApiData {
  columns: Array<any>,
  data: Array<any>
}
