import {ConvertActionType, LoadingType} from "./convert.types";
import {SET_COVNERT, SET_LOADING} from "./convert.constants";

const initialState: Record<string, boolean|null|number> = {
  result: null,
  isLoading: false
};

export const convertReducer = (
  state = initialState,
  action: ConvertActionType | LoadingType
) => {
  switch (action.type) {
    case SET_COVNERT:
      return {...state, result: action.payload}
    case SET_LOADING:
      return {...state, isLoading: action.payload};
    default:
      return state;
  }
};

