import {RayanAction} from "../actions/rayan.action";
import {Column, Rayan} from "../models/rayan";

export interface RayanState {
  rayanDataList?: Rayan[];
  rayanDataCols?: Column[];
  rayanDisplayedCols?: string[];
  loading: boolean;
  error?: Error
}

const initialState = {
  rayanDataList: [{
    radif: 0,
    date: "",
    stateName: "",
    identityName: ""
  }],
  rayanDataCols: [
    {
      "field": "radif",
      "header": "شماره پرونده"
    },
    {
      "field": "date",
      "header": "تاریخ"
    },
  ],
  rayanDisplayedCols: [''],
  loading: false
}

export function RayanReducer(state: RayanState = initialState, action: RayanAction) {
  switch (action.type) {
    case "[RAYAN] LOAD DATA":
      return {...state, loading: true};
    case "[RAYAN] SUCCESS LOAD DATA":
      return {
        ...state,
        loading: false,
        rayanDataList: action.payload.data,
        rayanDataCols: action.payload.columns,
        rayanDisplayedCols: action.payload.displayedCol
      };
    case "[RAYAN] FAILURE LOAD DATA":
      return {...state, loading: false, error: action.payload};
    case "[RAYAN] ADD DATA":
      return {...state, loading: true, rayanDataList: [action.payload]};
    case "[RAYAN] SUCCESS ADD DATA":
      return {...state, loading: false, rayanDataList: [action.payload]};
    case "[RAYAN] FAILURE ADD DATA":
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
}
