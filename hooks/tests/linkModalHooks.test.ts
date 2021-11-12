import { ShareLinkState } from "../../utils/types";
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

let shareLinkState: ShareLinkState;

beforeEach(() => {
  mockDispatch.mockClear();
  mockSelector.mockClear();
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
    mockSelector.mockReturnValue({ link: { ...shareLinkState } });
    mockUseRef.mockReturnValue(123);
    const [props, textRef, func] = useLinkModal();
    expect(props).toEqual(shareLinkState);
    expect(textRef).toEqual(123);
    expect(typeof func).toBe("function");
  });

  // it("should send position (without code) and update link", async () => {});

  // it("should send position and code, then update link", async () => {});

  // it("should display error message if network call failed", async () => {});
});
