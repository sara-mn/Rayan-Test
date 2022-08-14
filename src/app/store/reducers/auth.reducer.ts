import {AuthAction, AuthActionTypes} from "../actions/auth.action";
import {Login, Token} from "../models/auth";

export interface AuthState {
  login: Login;
  token: Token;
  loading: boolean;
  error?: Error
}

const initialState : AuthState = {
  login: {
    userName: '',
    userPass: ''
  },
  token: {
    token: '',
    expiration: ''
  },
  loading: false,
  error: undefined
}

export function AuthReducer(state: AuthState = initialState, action: AuthAction) : AuthState {

  switch (action.type) {
    case '[AUTH] LOGIN':
      return {...state, loading: true};
    case AuthActionTypes.LOGIN_SUCCESS:
      return {...state, loading: false, token: action.payload}
    case AuthActionTypes.LOGIN_FAILURE:
      return {...state, loading: false, error: action.payload}
    case AuthActionTypes.LOGIN_EXPIRED:
      return {...state, loading: false, token: {token: '', expiration: ''}}
    case AuthActionTypes.LOGOUT:
      return {...state, loading: true}
    case AuthActionTypes.LOGOUT_SUCCESS:
      return {...state, loading: false, token: {token: '', expiration: ''}}
    case AuthActionTypes.LOGOUT_FAILURE:
      return {...state, loading: false, error: action.payload}
    default:
      return state;
  }

}
