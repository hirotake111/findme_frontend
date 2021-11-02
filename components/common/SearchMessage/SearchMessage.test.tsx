import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { useAppDispatch } from "../../../hooks/reduxHooks";

import { store } from "../../../utils/store";
import { MapSearchStatus } from "../../../utils/types";
import SearchMessage from "./SearchMessage";

const cLog = console.log;
const cGroup = console.group;

beforeEach(() => {
  console.log = jest.fn();
  console.group = jest.fn();
});

afterEach(() => {
  console.log = cLog;
  console.group = cGroup;
});

const Component = ({ value }: { value: MapSearchStatus }) => {
  const dispatch = useAppDispatch();
  dispatch({ type: "search/updateSearchStatus", payload: value });
  return null;
};
it("should render searching message if search status is 'stop'", () => {
  expect.assertions(1);
  const { container } = render(
    <Provider store={store}>
      <SearchMessage />
      <Component value={{ status: "stop" }} />
    </Provider>
  );
  expect(container.firstChild).toBeNull();
});

it("should render searching message if search status is 'searching'", () => {
  expect.assertions(1);
  const { getByText } = render(
    <Provider store={store}>
      <SearchMessage />
      <Component value={{ status: "searching" }} />
    </Provider>
  );
  expect(getByText("Searching now...")).toBeTruthy();
});

it("should render error message if search status is 'error'", () => {
  expect.assertions(1);
  const err = "unable to get geolocation!";
  const { getByText } = render(
    <Provider store={store}>
      <SearchMessage />
      <Component value={{ status: "error", detail: err }} />
    </Provider>
  );
  expect(getByText(`ERROR: ${err}`)).toBeTruthy();
});
