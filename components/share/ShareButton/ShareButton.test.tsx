import { render, fireEvent } from "@testing-library/react";

import ShareButton from "./ShareButton";

// mock useModalEnabled
const mockEnable = jest.fn();
jest.mock("../../../hooks/linkModalHooks", () => ({
  useModalEnabled: () => mockEnable,
}));

beforeEach(() => {
  mockEnable.mockClear();
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
