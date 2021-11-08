import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import NextPage from "../pages/index";
import { store } from "../utils/store";

// mock components
jest.mock("../components/common/SearchMessage/SearchMessage");
jest.mock("../components/map/Geolocation/Geolocation");
jest.mock("../components/map/Container/Container");

it("should render child components", () => {
  expect.assertions(1);
  const { container } = render(
    <Provider store={store}>
      <NextPage />
    </Provider>
  );
  expect(container.firstChild?.childNodes.length).toBe(3);
});
