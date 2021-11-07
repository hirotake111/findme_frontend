import { render } from "@testing-library/react";
import Container from "../../map/Container/Container";
import Initializer from "./Initializer";

it("should reunder nothing", () => {
  expect.assertions(1);
  const { container } = render(<Initializer positionId={""} />);
  expect(container.firstChild).toBe(null);
});
