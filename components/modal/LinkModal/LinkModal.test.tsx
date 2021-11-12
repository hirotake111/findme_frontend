import { render } from "@testing-library/react";

import { ShareLinkState } from "../../../utils/types";
import LinkModal from "./LinkModal";

let link: ShareLinkState;

// mock useLinkModal hook
const mockUseLinkModal = jest.fn();
jest.mock("../../../hooks/linkModalHooks", () => ({
  useLinkModal: () => mockUseLinkModal(),
}));

beforeEach(() => {
  mockUseLinkModal.mockClear();
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
