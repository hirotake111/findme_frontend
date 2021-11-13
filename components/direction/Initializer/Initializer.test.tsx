import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../utils/store";

import Initializer from "./Initializer";

// mock directionHook
jest.mock("../../../hooks/directionHooks");

it("should reunder nothing", () => {
  expect.assertions(1);
  const { container } = render(
    <Provider store={store}>
      <Initializer positionId={""} />
    </Provider>
  );
  expect(container.firstChild).toBe(null);
});
