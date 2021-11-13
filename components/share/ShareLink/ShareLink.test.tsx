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

it("should invoke onClick callback", () => {
  expect.assertions(1);
  const { getByTestId } = render(<ShareLink link={link} />);
  fireEvent.click(getByTestId("clickevent"));
  expect(mockWriteText).toHaveBeenCalledWith(link);
});
