import { render } from "@testing-library/react";
import CopyMessage from "./CopyMessage";

// mock useSelector
const mockSelector = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: (params: any) => mockSelector(params),
}));

it("should render coponent if copyMessage is true", () => {
  expect.assertions(1);
  mockSelector.mockReturnValue({ copyMessage: true });
  const { getByText } = render(<CopyMessage />);
  expect(getByText("Copied to clipboard!")).toBeTruthy();
});

it("should not render coponent if copyMessage is false", () => {
  expect.assertions(1);
  mockSelector.mockReturnValue({ copyMessage: false });
  const { container } = render(<CopyMessage />);
  expect(container.firstChild).toBeNull();
});
