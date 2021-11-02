import { render } from "@testing-library/react";

import Geolocation from "./Geolocation";
import { Provider } from "react-redux";
import { store } from "../../../utils/store";

const log = console.log;
const group = console.group;

// mock useGetCurrentPosition hook
const mockGetCurrentPosition = jest.fn();
jest.mock("../../../hooks/searchHooks", () => ({
  useGetCurrentPosition: () => () => mockGetCurrentPosition(),
}));

beforeEach(() => {
  console.log = jest.fn();
  console.group = jest.fn();
  mockGetCurrentPosition.mockClear();
});

afterEach(() => {
  console.log = log;
  console.group = group;
});

it("should render nothing", () => {
  expect.assertions(1);
  const { container } = render(
    <Provider store={store}>
      <Geolocation />
    </Provider>
  );
  expect(container.firstChild).toBeNull();
});

it("should invoke getCurrentPosition", () => {
  expect.assertions(1);
  render(
    <Provider store={store}>
      <Geolocation />
    </Provider>
  );
  expect(mockGetCurrentPosition).toHaveBeenCalledTimes(1);
});
