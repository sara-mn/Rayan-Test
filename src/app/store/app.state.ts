import {RayanState} from "./reducers/rayan.reducer";
import {AuthState} from "./reducers/auth.reducer";

export interface AppState {
  readonly rayan: RayanState;
  readonly auth: AuthState;
};
