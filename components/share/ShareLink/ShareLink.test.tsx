import { render, fireEvent } from "@testing-library/react";
import ShareLink from "./ShareLink";

const link = "https://example.com/xxxx";

// mock writeText() function
const mockWriteText = jest.fn();
Object.assign(global.navigator, {
  clipboard: {
    writeText: (param: any) => mockWriteText(param),
  },
});

// mock useCopyMessageHandler hook
const mockHook = jest.fn();
jest.mock("../../../hooks/linkModalHooks", () => ({
  useCopyMessageHandler: () => mockHook,
}));

// mock components
jest.mock("../CopyMessage/CopyMessage");

it("should redner link if link exists", () => {
  expect.assertions(1);
  const { container } = render(<ShareLink link={link} />);
  expect(container.firstChild).toBeTruthy();
});

it("should not redner link if not exists", () => {
  expect.assertions(1);
  const { container } = render(<ShareLink link="" />);
  expect(container.firstChild).toBeNull();
});

it("should invoke handleclick callback", () => {
  expect.assertions(2);
  const { getByTestId } = render(<ShareLink link={link} />);
  fireEvent.click(getByTestId("clickevent"));
  expect(mockWriteText).toHaveBeenCalledWith(link);
  expect(mockHook).toHaveBeenCalledTimes(1);
});
