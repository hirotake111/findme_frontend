import { Position, ShareLinkState } from "../../utils/types";
import { useLinkModal } from "../linkModalHooks";

// mock dispatch and selector
const mockDispatch = jest.fn();
const mockSelector = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector(),
}));

// mock useRef
const mockUseRef = jest.fn();
jest.mock("react", () => ({
  useRef: (params: any) => mockUseRef(params),
}));

// mock createLink
const mockCreateLink = jest.fn();
jest.mock("../../utils/api", () => ({
  api: {
    createLink: (params: any) => mockCreateLink(params),
  },
}));
let shareLinkState: ShareLinkState;

beforeEach(() => {
  mockDispatch.mockClear();
  mockSelector.mockClear();
  mockCreateLink.mockClear();
  mockCreateLink.mockReset();
  shareLinkState = {
    modalEnabled: false,
    errorMessage: "",
    link: "",
    submitStatus: "stop",
  };
});

describe("useLinkModal", () => {
  it("should return state, ref and function", async () => {
    expect.assertions(3);
    const position: Position = { latitude: 1, longitude: 3 };
    mockSelector.mockReturnValue({
      link: { ...shareLinkState },
      map: { position },
    });
    mockUseRef.mockReturnValue(123);
    const [props, textRef, func] = useLinkModal();
    expect(props).toEqual(shareLinkState);
    expect(textRef).toEqual(123);
    expect(typeof func).toBe("function");
  });

  it("should dispatch actions", async () => {
    expect.assertions(1);
    const position: Position = { latitude: 1, longitude: 3 };
    mockSelector.mockReturnValue({
      link: { ...shareLinkState },
      map: { position },
    });
    mockUseRef.mockReturnValue({ current: { value: 123 } });
    mockCreateLink.mockReturnValue({
      result: "success",
      link: "https://example.com/xxx",
      position,
    });
    const [props, textRef, func] = useLinkModal();
    await func();
    expect(mockDispatch).toHaveBeenCalledTimes(4);
  });

  it("should send position (without code) and update link", async () => {
    expect.assertions(2);
    const position: Position = { latitude: 1, longitude: 3 };
    mockSelector.mockReturnValue({
      link: { ...shareLinkState },
      map: { position },
    });
    mockUseRef.mockReturnValue({ current: null });
    mockCreateLink.mockReturnValue({
      result: "success",
      link: "https://example.com/xxx",
      position,
    });
    const [props, textRef, func] = useLinkModal();
    await func();
    expect(mockCreateLink).toHaveBeenCalledWith({
      ...position,
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "share/updateLink",
      payload: { link: "https://example.com/xxx" },
    });
  });

  it("should send position and code, then update link", async () => {
    expect.assertions(2);
    const position: Position = { latitude: 1, longitude: 3 };
    mockSelector.mockReturnValue({
      link: { ...shareLinkState },
      map: { position },
    });
    mockUseRef.mockReturnValue({ current: { value: "abcd" } });
    mockCreateLink.mockReturnValue({
      result: "success",
      link: "https://example.com/xxx",
      position,
    });
    const [props, textRef, func] = useLinkModal();
    await func();
    expect(mockCreateLink).toHaveBeenCalledWith({
      ...position,
      code: "abcd",
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "share/updateLink",
      payload: { link: "https://example.com/xxx" },
    });
  });

  it("should display error message if network call failed", async () => {
    expect.assertions(1);
    const tmp = console.error;
    console.error = jest.fn();
    const position: Position = { latitude: 1, longitude: 3 };
    const err = new Error("network error!");
    mockSelector.mockReturnValue({
      link: { ...shareLinkState },
      map: { position },
    });
    mockUseRef.mockReturnValue({ current: { value: "abcd" } });
    mockCreateLink.mockImplementation(() => {
      throw err;
    });
    const [props, textRef, func] = useLinkModal();
    await func();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "share/updateErrorMessage",
      payload: { message: "network error!" },
    });
    console.error = tmp;
  });

  it("should not display error message if it throws object other than Error", async () => {
    expect.assertions(1);
    const tmp = console.error;
    console.error = jest.fn();
    const position: Position = { latitude: 1, longitude: 3 };
    const err = "error!";
    mockSelector.mockReturnValue({
      link: { ...shareLinkState },
      map: { position },
    });
    mockUseRef.mockReturnValue({ current: { value: "abcd" } });
    mockCreateLink.mockImplementation(() => {
      throw err;
    });
    const [props, textRef, func] = useLinkModal();
    await func();
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    console.error = tmp;
  });
});
