import {GridActionPayload, GridData, Rayan} from "../models/rayan";
import {Action} from '@ngrx/store';

export const
  LOAD_DATA = '[RAYAN] LOAD DATA',
  SUCCESS_LOAD_DATA = '[RAYAN] SUCCESS LOAD DATA',
  FAILURE_LOAD_DATA = '[RAYAN] FAILURE LOAD DATA',
  ADD_DATA = '[RAYAN] ADD DATA',
  SUCCESS_ADD_DATA = '[RAYAN] SUCCESS ADD DATA',
  FAILURE_ADD_DATA = '[RAYAN] FAILURE ADD DATA';

export class LoadRayanAction implements Action {
  readonly type = LOAD_DATA;
}

export class SuccessLoadRayanAction implements Action {
  readonly type = SUCCESS_LOAD_DATA;

  constructor(public payload: GridActionPayload) {
  }
}

export class FailureLoadRayanAction implements Action {
  readonly type = FAILURE_LOAD_DATA;

  constructor(public payload: Error) {
  }
}

export class AddRayanAction implements Action {
  readonly type = ADD_DATA;

  constructor(public payload: Rayan) {
  }
}

export class SuccessAddRayanAction implements Action {
  readonly type = SUCCESS_ADD_DATA;

  constructor(public payload: Rayan) {
  }
}

export class FailureAddRayanAction implements Action {
  readonly type = FAILURE_ADD_DATA;

  constructor(public payload: Error) {
  }
}

export type RayanAction =
  LoadRayanAction
  | AddRayanAction
  | SuccessLoadRayanAction
  | FailureLoadRayanAction
  | SuccessAddRayanAction
  | FailureAddRayanAction;
