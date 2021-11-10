import { render } from "@testing-library/react";
import CodeModal from "./CodeModal";

// mock useSelector
const mockUseSelector = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: () => mockUseSelector(),
}));

beforeEach(() => {
  mockUseSelector.mockClear();
});

it("should render modal", () => {
  expect.assertions(2);
  mockUseSelector.mockReturnValue({ codeModalEnabled: true });
  const { getByText } = render(<CodeModal />);
  expect(getByText("Code required:")).toBeTruthy();
  expect(mockUseSelector).toHaveBeenCalledTimes(1);
});

it("should not render modal if codeModalEnabled is false", () => {
  expect.assertions(1);
  mockUseSelector.mockReturnValue({ codeModalEnabled: false });
  const { container } = render(<CodeModal />);
  expect(container.firstChild).toBeNull();
});
