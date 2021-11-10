import {
  toggleCodeModalAction,
  updateDirectionAction,
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

describe("updateDirectionAction", () => {
  it("should return action", () => {
    expect.assertions(1);
    expect(updateDirectionAction({ latitude: 2, longitude: 1 })).toEqual({
      type: "search/updateDirection",
      payload: { latitude: 2, longitude: 1 },
    });
  });
});

describe("toggleCodeModalAction", () => {
  it("should return action", () => {
    expect.assertions(1);
    expect(toggleCodeModalAction({ codeModalEnabled: true })).toEqual({
      type: "search/toggleCodeModal",
      payload: { codeModalEnabled: true },
    });
  });
});
