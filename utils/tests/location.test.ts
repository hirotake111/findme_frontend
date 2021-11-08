import { initialize } from "@googlemaps/jest-mocks";

import { setPosition } from "../location";

// mock loader
const mockCallback = jest.fn();
jest.mock("../config", () => ({
  loader: {
    load: () => Promise.resolve(mockCallback()),
  },
}));

describe("setPosition", () => {
  beforeEach(() => {
    initialize();
    mockCallback.mockClear();
  });

  it("should perform loader callback", async () => {
    expect.assertions(1);
    try {
      await setPosition({ latitude: 100, longitude: 100 });
      expect(mockCallback).toHaveBeenCalledTimes(1);
    } catch (e) {
      throw e;
    }
  });

  it("should not perform loader callback if latitude and logitude is default value", async () => {
    expect.assertions(1);
    try {
      await setPosition({ latitude: -200, longitude: -200 });
      expect(mockCallback).toHaveBeenCalledTimes(0);
    } catch (e) {
      throw e;
    }
  });
});
