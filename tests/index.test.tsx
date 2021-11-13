import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import Home from "../pages/index";
import { store } from "../utils/store";

// mock components
jest.mock("../components/common/ErrorMessage/ErrorMessage");
jest.mock("../components/map/Geolocation/Geolocation");
jest.mock("../components/map/Container/Container");
jest.mock("../components/share/ShareButton/ShareButton");

it("should render child components", () => {
  expect.assertions(1);
  const { container } = render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  expect(container.firstChild?.childNodes.length).toBe(3);
});
