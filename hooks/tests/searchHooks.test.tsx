import { configureStore, EnhancedStore } from "@reduxjs/toolkit";

import { rootReducer } from "../../reducers/rootReducer";
import { RootState } from "../../utils/types";
import { useGetCurrentPosition, useSearchStatus } from "../searchHooks";
import { renderHook } from "@testing-library/react-hooks";

let store: EnhancedStore<RootState>;
const tmp = console.error;

// mock dispatch
const mockDispatch = jest.fn();
jest.mock("../reduxHooks", () => ({
  useAppDispatch: () => mockDispatch,
}));

// mock getCurrentPosition
const mockGetCurrentPosition = jest.fn();
// global.navigator.geolocation.getCurrentPosition = mockGetCurrentPosition;
Object.assign(global.navigator, {
  geolocation: { getCurrentPosition: mockGetCurrentPosition },
});

beforeEach(() => {
  store = configureStore({ reducer: rootReducer });
  mockDispatch.mockClear();
  console.error = jest.fn();
});

afterEach(() => {
  console.error = tmp;
});

describe("useSearchStatus", () => {
  it("should update search status", () => {
    expect.assertions(1);
    useSearchStatus()({ status: "searching" });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "search/updateSearchStatus",
      payload: { status: "searching" },
    });
  });
});

describe("useGetCurrentPosition", () => {
  it("should update search status 2 times and udpate position", () => {
    expect.assertions(4);
    // set mock value
    mockGetCurrentPosition.mockImplementation((callback, error) => {
      return callback({ coords: { latitude: 123, longitude: 111 } });
    });
    // perform hook
    renderHook(() => useGetCurrentPosition());
    // validation
    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "search/updatePosition",
      payload: { latitude: 123, longitude: 111 },
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "search/updateSearchStatus",
      payload: { status: "stop" },
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "search/updateSearchStatus",
      payload: { status: "searching" },
    });
  });

  it("should update search status 2 times if it failed to get position", () => {
    expect.assertions(1);
    // set mock value
    mockGetCurrentPosition.mockImplementation((callback, error) => {
      error(new Error("unknown error!"));
    });
    // perform hook
    renderHook(() => useGetCurrentPosition());
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});
