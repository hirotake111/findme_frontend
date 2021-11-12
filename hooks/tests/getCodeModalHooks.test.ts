import { useGetCodeModal } from "../getCodeModalHooks";
import { api } from "../../utils/api";

// mock api
const mockGetDestinationByCode = jest.fn();
jest.mock("../../utils/api", () => ({
  api: {
    getDestinationByCode: () => mockGetDestinationByCode(),
  },
}));

// mock useDispatch and useSelector
const mockDispatch = jest.fn();
const mockSelector = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector(),
}));

beforeEach(() => {
  mockGetDestinationByCode.mockClear();
  mockGetDestinationByCode.mockReset();
  mockDispatch.mockClear();
  mockSelector.mockClear();
});

describe("useGetCodeModal", () => {
  it("should update destination in redux store", async () => {
    expect.assertions(3);
    mockGetDestinationByCode.mockReturnValue({
      result: "success",
      position: { latitude: 1.111, longitude: 2.222 },
    });
    mockSelector.mockReturnValue({ modalEnabled: false, positionId: "xxxxxx" });
    const [enabled, get] = useGetCodeModal();
    expect(enabled).toBe(false);
    await get("mycode");
    expect(mockDispatch).toHaveBeenCalledTimes(7);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "search/updateDirection",
      payload: { latitude: 1.111, longitude: 2.222 },
    });
  });

  it("should update error message if api failed", async () => {
    expect.assertions(2);
    const tmp = console.error;
    console.error = jest.fn();
    const err = new Error("network error!");
    mockGetDestinationByCode.mockImplementation(() => {
      throw err;
    });
    mockSelector.mockReturnValue({ modalEnabled: false, positionId: "xxxxxx" });
    const [enabled, get] = useGetCodeModal();
    try {
      await get("mycode");
      expect(mockDispatch).toHaveBeenCalledTimes(5);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "getcode/updateModalErrorMessage",
        payload: { message: err.message },
      });
    } finally {
      console.error = tmp;
    }
  });
});
