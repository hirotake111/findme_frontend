import { renderHook } from "@testing-library/react-hooks";

import { useUpdateDirection } from "../directionHooks";

// mock api.getDirection
const mockGetDestination = jest.fn();
jest.mock("../../utils/api", () => ({
  api: {
    getDestination: (url: string) => mockGetDestination(url),
  },
}));

// mock useDispatch
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => jest.fn(),
}));

describe("useUpdateDirection hook", () => {
  it("should update direction in redux store", async () => {
    expect.assertions(1);
    const position = { latitude: 20.0, longitude: 30.0 };
    mockGetDestination.mockReturnValue(
      Promise.resolve({
        result: "success",
        position,
      })
    );
    await renderHook(() => useUpdateDirection("xxx"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "search/updateDirection",
      payload: position,
    });
  });

  it("should enable code modal in redux store if network call resulted in 'code required'", async () => {
    expect.assertions(1);
    mockGetDestination.mockReturnValue(
      Promise.resolve({ result: "core required" })
    );
    await renderHook(() => useUpdateDirection("xxx"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "search/toggleCodeModal",
      payload: { codeModalEnabled: true },
    });
  });

  it("should update status to error if network call failed", async () => {
    expect.assertions(1);
    const err = new Error("network error!");
    mockGetDestination.mockImplementation(() => {
      throw err;
    });
    await renderHook(() => useUpdateDirection("xxx"));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "search/updateSearchStatus",
      payload: { status: "error", detail: err },
    });
  });
});
