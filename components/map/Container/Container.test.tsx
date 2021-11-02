import React, { useEffect } from "react";
import { render } from "@testing-library/react";

import Container from "./Container";
import { Provider } from "react-redux";
import { store } from "../../../utils/store";
import { useAppDispatch } from "../../../hooks/reduxHooks";

const consoleLog = console.log;
const consoleGroup = console.group;

beforeAll(() => {
  console.log = jest.fn();
  console.group = jest.fn();
});

afterAll(() => {
  console.log = consoleLog;
  console.group = consoleGroup;
});

// dummy component that updates positions
const Component = ({ value }: { value: number }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({
      type: "search/updatePosition",
      payload: { latitude: value, longitude: value },
    });
  }, []);
  return null;
};

it("sould render MapContainer", () => {
  expect.assertions(1);
  const { container } = render(
    <Provider store={store}>
      <Container />
      <Component value={0} />
    </Provider>
  );
  expect(container.getElementsByClassName("map").length).toEqual(1);
});

it("should render a loading spinner if positions are default value", () => {
  expect.assertions(1);
  const { getByText } = render(
    <Provider store={store}>
      <Component value={-200} />
      <Container />
    </Provider>
  );
  expect(getByText("Loading")).toBeTruthy();
});
