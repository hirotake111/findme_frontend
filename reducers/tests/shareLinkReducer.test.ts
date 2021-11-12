import { ShareLinkActionTypes } from "../../actions/shareLinkActions";
import { ShareLinkState } from "../../utils/types";
import { shareLinkReducer as reducer } from "../shareLinkReducer";

let state: ShareLinkState;
let payload: ShareLinkActionTypes;

beforeEach(() => {
  state = {
    modalEnabled: false,
    errorMessage: "",
    link: "",
    submitStatus: "stop",
  };
});

it("should update modalEnabled", () => {
  expect.assertions(1);
  payload = { type: "share/updateModal", payload: { enabled: true } };
  expect(reducer(state, payload)).toEqual({ ...state, modalEnabled: true });
});

it("should update errorMessage", () => {
  expect.assertions(1);
  payload = { type: "share/updateErrorMessage", payload: { message: "hey" } };
  expect(reducer(state, payload)).toEqual({ ...state, errorMessage: "hey" });
});

it("should update link", () => {
  expect.assertions(1);
  payload = { type: "share/updateLink", payload: { link: "abcd" } };
  expect(reducer(state, payload)).toEqual({ ...state, link: "abcd" });
});

it("should update status", () => {
  expect.assertions(1);
  payload = {
    type: "share/updateSubmitStatus",
    payload: { status: "submitting" },
  };
  expect(reducer(state, payload)).toEqual({
    ...state,
    submitStatus: "submitting",
  });
});
