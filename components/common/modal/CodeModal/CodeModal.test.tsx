import { render } from "@testing-library/react";
import CodeModal from "./CodeModal";

// mock useGetCodeModalHook
const mockUseGetCodeModal = jest.fn();
jest.mock("../../../../hooks/getCodeModalHooks", () => ({
  useGetCodeModal: () => mockUseGetCodeModal(),
}));

beforeEach(() => {
  mockUseGetCodeModal.mockClear();
});

it("should render modal", () => {
  expect.assertions(2);
  mockUseGetCodeModal.mockReturnValue([true]);
  const { getByText } = render(<CodeModal />);
  expect(getByText("Code required:")).toBeTruthy();
  expect(mockUseGetCodeModal).toHaveBeenCalledTimes(1);
});

it("should not render modal if codeModalEnabled is false", () => {
  expect.assertions(1);
  mockUseGetCodeModal.mockReturnValue([false]);
  const { container } = render(<CodeModal />);
  expect(container.firstChild).toBeNull();
});
