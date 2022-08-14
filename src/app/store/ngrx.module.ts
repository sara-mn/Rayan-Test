import {NgModule} from "@angular/core";
import {EffectsModule} from '@ngrx/effects';
import {ActionReducerMap, StoreModule} from "@ngrx/store";
import {AppState} from "./app.state";

import {RayanEffects} from "./effects/rayan.effects";

import {RayanReducer as rayanReducer} from "./reducers/rayan.reducer"
import {AuthReducer as authReducer} from "./reducers/auth.reducer";
import {AuthEffects} from "./effects/auth.effects";

const reducers: ActionReducerMap<AppState, any> = {
  rayan: rayanReducer,
  auth: authReducer
};

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([RayanEffects , AuthEffects])
  ]
})
export class NgrxModule {

}
