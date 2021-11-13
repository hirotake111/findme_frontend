// import { useRef } from "react";
import { useGetCodeModal } from "../getCodeModalHooks";

// mock api
const mockGetDestinationByCode = jest.fn();
jest.mock("../../utils/api", () => ({
  api: {
    getDestinationByCode: (id: string, code: string) =>
      mockGetDestinationByCode(id, code),
  },
}));

// mock useRef
const mockUseRef = jest.fn();
jest.mock("react", () => ({
  useRef: (params: any) => mockUseRef(params),
}));
// mock useDispatch and useSelector
const mockDispatch = jest.fn();
const mockSelector = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (func: (state: any) => any) => mockSelector(func),
}));

beforeEach(() => {
  mockGetDestinationByCode.mockClear();
  mockGetDestinationByCode.mockReset();
  mockDispatch.mockClear();
  mockSelector.mockClear();
  mockUseRef.mockClear();
});

describe("useGetCodeModal", () => {
  it("should update destination in redux store", async () => {
    expect.assertions(7);
    mockGetDestinationByCode.mockReturnValue({
      result: "success",
      position: { latitude: 1.111, longitude: 2.222 },
    });
    mockSelector.mockReturnValue({
      modalEnabled: false,
      submitButtonEnabled: false,
      positionId: "xxxxxx",
      errorMessage: "",
    });
    mockUseRef.mockReturnValue({ current: { value: "mycode" } });
    const [props, get] = useGetCodeModal();
    expect(props.modalEnabled).toBe(false);
    expect(props.submitButtonEnabled).toBe(false);
    expect(props.errorMessage).toBe("");
    await get();
    expect(mockDispatch).toHaveBeenCalledTimes(7);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "search/updateDirection",
      payload: { latitude: 1.111, longitude: 2.222 },
    });
    expect(mockGetDestinationByCode).toHaveBeenCalledWith("xxxxxx", "mycode");
    expect(typeof mockSelector.mock.calls[0][0]).toBe("function");
  });

  it("should update error message if code is null", async () => {
    expect.assertions(1);
    const tmp = console.error;
    console.error = jest.fn();
    mockUseRef.mockReturnValue({ current: { value: "" } });
    const [props, get] = useGetCodeModal();
    try {
      await get();
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "getcode/updateModalErrorMessage",
        payload: { message: "code is null..." },
      });
    } finally {
      console.error = tmp;
    }
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
    mockUseRef.mockReturnValue({ current: { value: "mycode" } });
    const [enabled, get] = useGetCodeModal();
    try {
      await get();
      expect(mockDispatch).toHaveBeenCalledTimes(5);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "getcode/updateModalErrorMessage",
        payload: { message: err.message },
      });
    } finally {
      console.error = tmp;
    }
  });

  it("should not update error message if api failed but not Error object thrown", async () => {
    expect.assertions(1);
    const tmp = console.error;
    console.error = jest.fn();
    const err = "error!";
    mockGetDestinationByCode.mockImplementation(() => {
      throw err;
    });
    mockSelector.mockReturnValue({ modalEnabled: false, positionId: "xxxxxx" });
    mockUseRef.mockReturnValue({ current: { value: "mycode" } });
    const [enabled, get] = useGetCodeModal();
    try {
      await get();
      expect(mockDispatch).toHaveBeenCalledTimes(4);
    } finally {
      console.error = tmp;
    }
  });
});
