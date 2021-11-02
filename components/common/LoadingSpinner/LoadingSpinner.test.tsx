import React from "react";
import { render } from "@testing-library/react";

import LoadingSpinner from "./LoadingSpinner";

it("should render spinner element", () => {
  expect.assertions(1);
  const { container } = render(<LoadingSpinner />);
  expect(container.getElementsByClassName("spinner").length).toEqual(1);
});
