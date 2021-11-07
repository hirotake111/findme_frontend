import { MapActionTypes } from "../../actions/mapActions";
import { MapState } from "../../utils/types";
import { mapReducer } from "../mapReducer";

const getFakeMapState = (): MapState => ({
  status: { status: "stop" },
  position: { latitude: -200, longitude: -200 },
  direction: { latitude: -200, longitude: -200 },
});

it("should return default state", () => {
  expect.assertions(1);
  const action: MapActionTypes = { type: "default" };
  expect(mapReducer(undefined, action)).toEqual(getFakeMapState());
});

it("should update status", () => {
  expect.assertions(1);
  const state = getFakeMapState();
  const action: MapActionTypes = {
    type: "search/updateSearchStatus",
    payload: { status: "searching" },
  };
  expect(mapReducer(state, action)).toEqual({
    ...state,
    status: { status: "searching" },
  });
});

it("should update position", () => {
  expect.assertions(1);
  const state = getFakeMapState();
  const payload = { latitude: 0, longitude: 0 };
  const action: MapActionTypes = { type: "search/updatePosition", payload };
  expect(mapReducer(state, action)).toEqual({ ...state, position: payload });
});

it("should update direction", () => {
  expect.assertions(1);
  const state = getFakeMapState();
  const payload = { latitude: 0, longitude: 0 };
  const action: MapActionTypes = { type: "search/updateDirection", payload };
  expect(mapReducer(state, action)).toEqual({ ...state, direction: payload });
});
