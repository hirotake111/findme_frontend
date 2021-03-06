import { GetCodeModalReducer, GetCodeModalState } from "../utils/types";

const init: GetCodeModalState = {
  modalEnabled: false,
  submitButtonEnabled: true,
  submitState: "stop",
  positionId: "",
  errorMessage: "",
};

export const getCodeModalReducer: GetCodeModalReducer = (
  state = init,
  action
) => {
  switch (action.type) {
    case "getcode/toggleCodeModal":
      return { ...state, modalEnabled: action.payload.codeModalEnabled };

    case "getcode/updateSubmitButton":
      return { ...state, submitButtonEnabled: action.payload.enabled };

    case "getcode/updateSubmitState":
      return { ...state, submitState: action.payload.state };

    case "getcode/updatePositionId":
      return { ...state, positionId: action.payload.id };

    case "getcode/updateModalErrorMessage":
      return { ...state, errorMessage: action.payload.message };

    default:
      return state;
  }
};
