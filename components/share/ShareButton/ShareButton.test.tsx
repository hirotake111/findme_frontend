import { render } from "@testing-library/react";

import ShareButton from "./ShareButton";

it("should render share button", () => {
  expect.assertions(1);
  const { getByText } = render(<ShareButton />);
  expect(getByText("Share")).toBeTruthy();
});
