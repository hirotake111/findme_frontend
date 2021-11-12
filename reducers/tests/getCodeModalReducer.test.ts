import { GetCodeModalActionTypes } from "../../actions/getCodeModalActions";
import { GetCodeModalState } from "../../utils/types";
import { getCodeModalReducer as reducer } from "../getCodeModalReduer";

let state: GetCodeModalState = {
  modalEnabled: false,
  submitButtonEnabled: true,
  submitState: "stop",
  positionId: null,
};

let payload: GetCodeModalActionTypes;

it("should update modalEnabled", () => {
  expect.assertions(1);
  payload = {
    type: "getcode/toggleCodeModal",
    payload: { codeModalEnabled: true },
  };
  expect(reducer(state, payload)).toEqual({ ...state, modalEnabled: true });
});

it("should update submitButtonEnabled", () => {
  expect.assertions(1);
  payload = {
    type: "getcode/updateSubmitButton",
    payload: { enabled: false },
  };
  expect(reducer(state, payload)).toEqual({
    ...state,
    submitButtonEnabled: false,
  });
});

it("should update submitState", () => {
  expect.assertions(1);
  payload = {
    type: "getcode/updateSubmitState",
    payload: { state: "submitting" },
  };
  expect(reducer(state, payload)).toEqual({
    ...state,
    submitState: "submitting",
  });
});

it("should update position ID", () => {
  expect.assertions(1);
  payload = { type: "getcode/updatePositionId", payload: { id: "xxx" } };
  expect(reducer(state, payload)).toEqual({ ...state, positionId: "xxx" });
});

it("should update nothing by default", () => {
  expect.assertions(1);
  payload = { type: "default" };
  expect(reducer(state, payload)).toBe(state);
});
