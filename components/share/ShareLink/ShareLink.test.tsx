import { render } from "@testing-library/react";
import ShareLink from "./ShareLink";

it("should redner link if link exists", () => {
  expect.assertions(1);
  const { container } = render(<ShareLink link="http://example.com/xxxx" />);
  expect(container.firstChild).toBeTruthy();
});
