import { render, fireEvent } from "@testing-library/react";

import ShareButton from "./ShareButton";

// mock useModalEnabled
const mockEnable = jest.fn();
jest.mock("../../../hooks/linkModalHooks", () => ({
  useModalEnabled: () => mockEnable,
}));

// mock useSelector
const mockSelector = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: (params: any) => mockSelector(params),
}));

beforeEach(() => {
  mockEnable.mockClear();
  mockSelector.mockClear();
  mockSelector.mockReturnValue({ positionId: "" });
});

it("should render share button", () => {
  expect.assertions(1);
  const { getByText } = render(<ShareButton />);
  expect(getByText("Share")).toBeTruthy();
});

it("should invoke onclick callback", () => {
  const { getByText } = render(<ShareButton />);
  fireEvent.click(getByText("Share"));
  expect(mockEnable).toHaveBeenCalledTimes(1);
});

it("should not render share button if positionId is given", () => {
  expect.assertions(1);
  mockSelector.mockReturnValue({ positionId: "xxx" });
  const { container } = render(<ShareButton />);
  expect(container.firstChild).toBeNull();
});
