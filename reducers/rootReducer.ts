import { combineReducers } from "redux";
import { getCodeModalReducer } from "./getCodeModalReduer";
import { mapReducer } from "./mapReducer";

export const rootReducer = combineReducers({
  map: mapReducer,
  getCodeModal: getCodeModalReducer,
});
