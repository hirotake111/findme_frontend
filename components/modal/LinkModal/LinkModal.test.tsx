import { render, fireEvent } from "@testing-library/react";

import { ShareLinkState } from "../../../utils/types";
import LinkModal from "./LinkModal";

let link: ShareLinkState;

// mock useLinkModal hook
const mockUseLinkModal = jest.fn();
const mockCallback = jest.fn();
jest.mock("../../../hooks/linkModalHooks", () => ({
  useLinkModal: () => mockUseLinkModal(),
}));

beforeEach(() => {
  mockUseLinkModal.mockClear();
  mockCallback.mockClear();
  link = {
    modalEnabled: false,
    errorMessage: "",
    link: "",
    submitStatus: "stop",
  };
});

it("should render modal if modalEnabled is true", () => {
  expect.assertions(1);
  mockUseLinkModal.mockReturnValue([
    { ...link, modalEnabled: true },
    {},
    () => {},
  ]);
  const { getByText } = render(<LinkModal />);
  expect(getByText("Share Link")).toBeTruthy();
});

it("should invoke on click function if button is clicked", () => {
  expect.assertions(1);
  mockUseLinkModal.mockReturnValue([
    { ...link, modalEnabled: true },
    {},
    mockCallback,
  ]);
  const { getByText } = render(<LinkModal />);
  fireEvent.click(getByText("Share"));
  expect(mockCallback).toHaveBeenCalledTimes(1);
});
