import { initialize } from "@googlemaps/jest-mocks";

import { setPosition } from "../location";
import { Position } from "../types";

// mock loader
const mockLoad = jest.fn();
jest.mock("../config", () => ({
  loader: {
    load: () => mockLoad(),
  },
}));

// mock additional google maps api
const mockRoute = jest.fn();
const mockSetDirections = jest.fn();

describe("setPosition", () => {
  beforeEach(() => {
    initialize();
    mockLoad.mockClear();
    mockLoad.mockReset();
    mockRoute.mockClear();
    mockRoute.mockReset();
    // mock additional google maps api
    google.maps.DirectionsService = function () {
      return {
        route: (params: any, callback: any) => mockRoute(callback),
      };
    } as any;
    google.maps.DirectionsRenderer = function () {
      return {
        setMap: jest.fn(),
        setDirections: mockSetDirections,
      };
    } as any;
    google.maps.TravelMode = { WALKING: "WALKING" } as any;
  });

  it("should perform loader callback", async () => {
    expect.assertions(1);
    try {
      await setPosition({ position: { latitude: 100, longitude: 100 } });
      expect(mockLoad).toHaveBeenCalledTimes(1);
    } catch (e) {
      throw e;
    }
  });

  it("should not perform loader callback if latitude and logitude is default value", async () => {
    expect.assertions(1);
    try {
      await setPosition({ position: { latitude: -200, longitude: -200 } });
      expect(mockLoad).toHaveBeenCalledTimes(0);
    } catch (e) {
      throw e;
    }
  });

  it("should throw an error if loader failed to load", async () => {
    expect.assertions(1);
    const err = new Error("unknown error!");
    mockLoad.mockImplementation(() => {
      throw err;
    });
    try {
      await setPosition({ position: { latitude: 0, longitude: 0 } });
    } catch (e) {
      expect(e).toBe(err);
    }
  });

  it("should render direction if destination is given", async () => {
    expect.assertions(2);
    const position: Position = { latitude: 0, longitude: 0 };
    const destination: Position = { latitude: 1, longitude: 1 };
    mockRoute.mockImplementation((callback: any) => {
      callback({}, "OK");
    });
    try {
      await setPosition({ position, destination });
      expect(mockLoad).toHaveBeenCalledTimes(1);
      expect(mockSetDirections).toHaveBeenCalledTimes(1);
    } catch (e) {
      throw e;
    }
  });

  it("should throw an error if directionService.route() returns error status", async () => {
    expect.assertions(1);
    const position: Position = { latitude: 0, longitude: 0 };
    const destination: Position = { latitude: 1, longitude: 1 };
    mockRoute.mockImplementation((callback: any) => {
      callback({}, "NOT FOUND");
    });
    try {
      await setPosition({ position, destination });
    } catch (e) {
      expect(e).toEqual(new Error("NOT FOUND"));
    }
  });
});
