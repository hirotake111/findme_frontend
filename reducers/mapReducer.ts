import { MapReducer, MapState } from "../utils/types";

const init: MapState = {
  status: { status: "stop" },
  position: {
    latitude: -200,
    longitude: -200,
  },
  direction: {
    latitude: -200,
    longitude: -200,
  },
  codeModalEnabled: false,
  errorMessage: null,
};

export const mapReducer: MapReducer = (state = init, action) => {
  switch (action.type) {
    case "search/updateSearchStatus":
      return { ...state, status: action.payload };

    case "search/updatePosition":
      return { ...state, position: action.payload };

    case "search/updateDirection":
      return { ...state, direction: action.payload };

    case "search/toggleCodeModal":
      return { ...state, codeModalEnabled: action.payload.codeModalEnabled };

    case "search/updateErrorMessage":
      return { ...state, errorMessage: action.payload.message };

    default:
      return state;
  }
};
