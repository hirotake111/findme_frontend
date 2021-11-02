import {
  updateMapSearchStatusAction,
  updatePositionAction,
} from "../mapActions";

describe("updateMapSearchStatusAction", () => {
  it("should return action", () => {
    expect.assertions(1);
    expect(updateMapSearchStatusAction({ status: "searching" })).toEqual({
      type: "search/updateSearchStatus",
      payload: { status: "searching" },
    });
  });
});

describe("updatePositionAction", () => {
  it("should return action", () => {
    expect.assertions(1);
    expect(updatePositionAction({ latitude: 1, longitude: 2 })).toEqual({
      type: "search/updatePosition",
      payload: { latitude: 1, longitude: 2 },
    });
  });
});
