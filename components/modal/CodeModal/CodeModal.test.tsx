import { render, fireEvent } from "@testing-library/react";
import CodeModal from "./CodeModal";

// mock useGetCodeModalHook
const mockUseGetCodeModal = jest.fn();
const mockCallback = jest.fn();
jest.mock("../../../hooks/getCodeModalHooks", () => ({
  useGetCodeModal: () => mockUseGetCodeModal(),
}));

beforeEach(() => {
  mockUseGetCodeModal.mockClear();
  mockCallback.mockClear();
});

it("should render modal", () => {
  expect.assertions(2);
  mockUseGetCodeModal.mockReturnValue([
    {
      modalEnabled: true,
      submitButtonEnabled: true,
      textReg: { current: { value: "" } },
    },
    () => {},
  ]);
  const { getByText } = render(<CodeModal />);
  expect(getByText("Code required:")).toBeTruthy();
  expect(mockUseGetCodeModal).toHaveBeenCalledTimes(1);
});

it("should not render modal if codeModalEnabled is false", () => {
  expect.assertions(1);
  mockUseGetCodeModal.mockReturnValue([
    {
      modalEnabled: false,
      submitButtonEnabled: false,
      textReg: { current: { value: "" } },
    },
    () => {},
  ]);
  const { container } = render(<CodeModal />);
  expect(container.firstChild).toBeNull();
});

it("should not render modal if codeModalEnabled is false", () => {
  expect.assertions(1);
  mockUseGetCodeModal.mockReturnValue([
    {
      modalEnabled: true,
      submitButtonEnabled: true,
      textReg: { current: { value: "" } },
    },
    mockCallback,
  ]);
  const { getByText } = render(<CodeModal />);
  fireEvent.click(getByText("Verify"));
  expect(mockCallback).toHaveBeenCalledTimes(1);
});
