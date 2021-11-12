import { combineReducers } from "redux";
import { getCodeModalReducer } from "./getCodeModalReduer";
import { mapReducer } from "./mapReducer";
import { shareLinkReducer } from "./shareLinkReducer";

export const rootReducer = combineReducers({
  map: mapReducer,
  getCodeModal: getCodeModalReducer,
  link: shareLinkReducer,
});
