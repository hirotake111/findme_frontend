import { ShareLinkReducer, ShareLinkState } from "../utils/types";

const init: ShareLinkState = {
  modalEnabled: false,
  errorMessage: "",
  link: "",
  submitStatus: "stop",
};

export const shareLinkReducer: ShareLinkReducer = (state = init, action) => {
  switch (action.type) {
    case "share/updateModal":
      return { ...state, modalEnabled: action.payload.enabled };

    case "share/updateErrorMessage":
      return { ...state, errorMessage: action.payload.message };

    case "share/updateLink":
      return { ...state, link: action.payload.link };

    case "share/updateSubmitStatus":
      return { ...state, submitStatus: action.payload.status };

    default:
      return state;
  }
};
