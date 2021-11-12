import { renderHook } from "@testing-library/react-hooks";
import { updateErrorMessageAction } from "../../actions/mapActions";

import { usePositionId, useUpdateDirection } from "../directionHooks";

// mock api.getDestination
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

// mock useRouter
const mockUseRouter = jest.fn();
jest.mock("next/dist/client/router", () => ({
  useRouter: () => mockUseRouter(),
}));

beforeEach(() => {
  mockDispatch.mockClear();
  mockGetDestination.mockClear();
  mockUseRouter.mockClear();
});

describe("useUpdateDirection hook", () => {
  it("should update direction in redux store", async () => {
    expect.assertions(2);
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
    // also it should update position id
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "getcode/updatePositionId",
      payload: { id: "xxx" },
    });
  });

  it("should enable code modal in redux store if network call resulted in 'code required'", async () => {
    expect.assertions(1);
    mockGetDestination.mockReturnValue(
      Promise.resolve({ result: "core required" })
    );
    await renderHook(() => useUpdateDirection("xxx"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "getcode/toggleCodeModal",
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
      payload: { message: "Error: network error!" },
      type: "search/updateErrorMessage",
    });
  });
});

describe("usePositionId", () => {
  it("should update positionId and return it", () => {
    expect.assertions(2);
    mockUseRouter.mockReturnValue({ query: { positionId: "x-x-x" } });
    expect(usePositionId()).toBe("x-x-x");
    expect(mockUseRouter).toHaveBeenCalledTimes(1);
  });

  it("should return null if received positionId is not string", () => {
    expect.assertions(1);
    mockUseRouter.mockReturnValue({ query: { positionId: ["x-x-x"] } });
    expect(usePositionId()).toBe(null);
  });
});
