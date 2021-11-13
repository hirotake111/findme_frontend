import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { useAppDispatch } from "../../../hooks/reduxHooks";

import { store } from "../../../utils/store";
import { MapSearchStatus } from "../../../utils/types";
import ErrorMessage from "./ErrorMessage";

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

const Component = ({ value }: { value: string | null }) => {
  const dispatch = useAppDispatch();
  dispatch({ type: "search/updateErrorMessage", payload: { message: value } });
  return null;
};

it("should render error message if exists", () => {
  expect.assertions(1);
  const { getByText } = render(
    <Provider store={store}>
      <ErrorMessage />
      <Component value={"error!!!"} />
    </Provider>
  );
  expect(getByText("ERROR: error!!!")).toBeTruthy();
});

it("should render nothing if error message doesn't exist", () => {
  expect.assertions(1);
  const { container } = render(
    <Provider store={store}>
      <ErrorMessage />
      <Component value={null} />
    </Provider>
  );
  expect(container.firstChild).toBeNull();
});
