import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import { MapSearchStatus } from "../../utils/types";
import { useSearchStatus } from "../searchHooks";
import { store } from "../../utils/store";

// mock getCurrentPosition
const mockGetCurrentPosition = jest.fn();
// global.navigator.geolocation.getCurrentPosition = mockGetCurrentPosition;
Object.assign(global.navigator, {
  geolocation: { getCurrentPosition: mockGetCurrentPosition },
});

const consoleLog = console.log;
const consoleGroup = console.group;
beforeEach(() => {
  console.log = jest.fn();
  console.group = jest.fn();
});

afterEach(() => {
  console.log = consoleLog;
  console.group = consoleGroup;
});

describe("useSearchStatus", () => {
  /**
   * test component
   */
  const Component = ({ status }: { status: MapSearchStatus }) => {
    const update = useSearchStatus();
    update(status);
    return <>test component</>;
  };

  it("should update search status", () => {
    expect.assertions(1);
    render(
      <Provider store={store}>
        <Component status={{ status: "searching" }} />)
      </Provider>
    );
    expect(store.getState().map.status).toEqual({ status: "searching" });
  });
});
